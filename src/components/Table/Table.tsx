import React, { useState } from 'react';
import './Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { TableProps } from '../../models/component';

const Table: React.FC<TableProps> = ({ data, headers, renderRow, rowsPerPage = 10, height }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = data.length === 0 ? 1 : Math.ceil(data.length / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = (): void => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = (): void => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className='table'>
      <div style={{height: height}}>
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                {renderRow(row, index)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='table-pagination'>
        <FontAwesomeIcon
          icon={faAngleLeft}
          className='table-pagination-icon'
          onClick={goToPreviousPage}
          style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }}
        />
        <span className='table-pagination-info'>
          Página {currentPage} de {totalPages}
        </span>
        <FontAwesomeIcon
          icon={faAngleRight}
          className='table-pagination-icon'
          onClick={goToNextPage}
          style={{ cursor: currentPage < totalPages ? 'pointer' : 'not-allowed' }}
        />
      </div>
    </div>
  );
};

export default Table;
