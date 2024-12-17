export const isSocial = (
  sources: {
    src: string | undefined;
    icon: React.JSX.Element;
  }[]
) => {
  const array = sources.map((source) => source.src);
  const allEmpty = array.every((value) => value === "");
  return allEmpty;
};
