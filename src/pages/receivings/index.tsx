import { useDocumentTitle } from '@hooks';
import React, { FunctionComponent } from 'react';
import { IPageProps } from "../types";

const Receivings: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <div> Receivings </div>
  );
};

export default Receivings;