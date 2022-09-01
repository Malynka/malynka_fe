import { useDocumentTitle } from '@hooks';
import React, { FunctionComponent } from 'react';
import { IPageProps } from "../types";

const OwnReceivings: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <div> Own receivings </div>
  );
};

export default OwnReceivings;