export const usePrepareHtml = () => {
  const processLinksToPosts = (text: string, topicId: string) => {
    const regexp = /(\()(\d+)(\))(?![^<>]*<\/)/gi; // (12)
    return text.replace(regexp, (res, ...segments) => {
      const number = segments[1];
      return `(<link data-topicid='${topicId}' data-number='${number}'></link>)`;
    });
  };

  const processCode1C = (text: string) => {
    return text
      .replace(/\[1[CС]\]/gi, "<code>") //[1C]
      .replace(/<1[CС]>/gi, "<code>") //<1C>
      .replace(/\[\/1[CС]\]/gi, "</code>") //[/1C]
      .replace(/<\/1[CС]>/gi, "</code>"); //</1C>
  };

  const processImages = (text: string) => {
    const regexp = /\[IMG_(\d*)\]/gi; // ([IMG_1])

    return text.replace(regexp, (res, ...segments) => {
      const idx = segments[0];
      return `<int_img idx='${idx}'></int_img>`;
    });
  };

  const prepareHtml = (text: string, topicId: string) => {
    if (!text) return text;

    let newtext = processCode1C(text);
    newtext = processLinksToPosts(newtext, topicId);
    return processImages(newtext);
  };

  return { prepareHtml };
};
