import React from 'react';

export default function HtmlRender({ data }) {
    const cleanedHtml = html.replace(/&nbsp;/g, ' ');
    return <div dangerouslySetInnerHTML={{ __html: cleanedHtml }} />;
}
