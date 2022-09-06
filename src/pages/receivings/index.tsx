import React, { FunctionComponent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { RoundedButton, Table, TableHeader } from '@molecules';
import { Header, ReceivingTableRow } from '@organisms';
import { useDocumentTitle } from '@hooks';
import { IPageProps } from "../types";
import { ReceivingsContainer } from './styles';


const Receivings: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <>
      <Header
        title={name}
        controls={
          <RoundedButton
            text="Додати прийоми"
            icon={<AddIcon />}
            variant="contained"
          />
        }
        tableHeader={ 
            <TableHeader width={621} headers={['Вага (кг)', 'Ціна (грн)', 'Сума (грн)', 'Всього (грн)']} />
        }
      />  
      
      <ReceivingsContainer>
        {new Array(30).fill(0).map((_, i) => (
          <ReceivingTableRow
            key={i}
            timestamp={Date.now()}
            client={{
              _id: '0',
              name: 'Чернявка Саня'
            }}
            rows={[
              [30, 90, 1230],
              [60, 20, 1231],
              [50, 30, 3000],
              [70, 10, 700],
            ]}
            allSum={400000}
          />
        ))}
        
      </ReceivingsContainer>
    </>
  );
};

export default Receivings;