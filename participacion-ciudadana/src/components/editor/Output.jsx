import dynamic from "next/dynamic";
import HtmlRender from "./HtmlRender";

const Output = dynamic(
  async () => {
    const EditorJSRenderer = (await import("editorjs-react-renderer")).default;
    return ({ data, style, className }) => (
      <EditorJSRenderer
        data={data}
        style={style}
        className={`${className} editor-content`} 
        renderers={{
          raw: HtmlRender,
        }}
      />
    );
  },
  { ssr: false }
);

export default function EditorOutput({ content }) {
  if (!content || !content.blocks) {
    return <div>No hay contenido disponible</div>; // Manejo de contenido nulo
  }
  const renderHtmlContent = (html) => {
    const cleanedHtml = html.replace(/&nbsp;/g, ' ');
    return <div dangerouslySetInnerHTML={{ __html: cleanedHtml }} />;
  };

  const renderTable = (tableData) => {
    const { content, withHeadings } = tableData;

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 border-separate border border-gray-300">
          <thead>
            {withHeadings && (
              <tr className="bg-gray-100">
                {content[0].map((heading, index) => (
                  <th key={index} className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {heading}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {content.slice(withHeadings ? 1 : 0).map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 border-b border-gray-300 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="prose max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      {content.blocks.map((block) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={block.id} className="mb-4 text-gray-800 leading-relaxed">
                {renderHtmlContent(block.data.text)}
              </p>
            );
          case 'header':
            return (
              <h2 key={block.id} className="mb-4 text-2xl font-bold text-gray-900">
                {renderHtmlContent(block.data.text)}
              </h2>
            );
          case 'list':
            return (
              <ul key={block.id} className="list-disc pl-5 mb-4 text-gray-800">
                {block.data.items.map((item, index) => (
                  <li key={index} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case 'image':
            return (
              <div key={block.id} className="mb-4">
                <img
                  src={block.data.file.url}
                  alt={block.data.caption}
                  className="w-full h-auto rounded-md shadow-md"
                />
                {block.data.caption && (
                  <p className="text-sm text-gray-500 mt-2">{block.data.caption}</p>
                )}
              </div>
            );
          case 'table':
            return (
              <div key={block.id} className="mb-4">
                {renderTable(block.data)}
              </div>
            );
          case 'raw':
            return (
              <div key={block.id} className="mb-4">
                {renderHtmlContent(block.data)}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
