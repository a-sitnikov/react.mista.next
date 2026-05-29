export const usePrepareHtml = () => {
  const processLinksToPosts = (text: string, topicId: string) => {
    const regexp = /(\()(\d+)(\))(?![^<>]*<\/)/gi; // (12)
    return text.replace(regexp, (res, ...segments) => {
      const number = segments[1];
      return `<link data-topicid='${topicId}' data-number='${number}' />`;
    });
  };

  const processCode1C = (text: string) => {
    return text
      .replace(/\[1[CС]\]/gi, "<code>") //[1C]
      .replace(/<1[CС]>/gi, "<code>") //<1C>
      .replace(/\[\/1[CС]\]/gi, "</code>") //[/1C]
      .replace(/<\/1[CС]>/gi, "</code>"); //</1C>
  };

  const prepareHtml = (text: string, topicId: string) => {
    if (!text) return text;

    const newtext = processCode1C(text);
    return processLinksToPosts(newtext, topicId);
  };

  return { prepareHtml };
};
