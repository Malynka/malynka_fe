import React, { FunctionComponent } from 'react';
import { Header } from '@organisms';
import { useDocumentTitle } from '@hooks';
import { IPageProps } from "../types";
import { ReportContainer } from './styles';

const Report: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <>
      <Header title={name} />
      <ReportContainer>
        Report
      </ReportContainer>
    </>
  );
};

export default Report;