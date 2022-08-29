import { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `Malynka - ${title}`;
  }, [title]);
};

export default useDocumentTitle;