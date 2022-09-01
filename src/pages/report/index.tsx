import { useDocumentTitle } from '@hooks';
import React, { FunctionComponent } from 'react';
import { IPageProps } from "../types";

const Report: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <div> RAPORT </div>
  );
};

export default Report;