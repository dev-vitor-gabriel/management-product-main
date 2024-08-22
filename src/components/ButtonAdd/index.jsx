import React from "react";

import {MdAdd, MdOutlineFileDownload} from 'react-icons/md';

export default function ButtonAdd( { adicionar, exportar, onClick, btnExport } ) {
    return(
      <div className="btn-area">
        <button className="add-btn" onClick={onClick}>
          <MdAdd size={18} color="#fff"/>
          <span>{adicionar}</span>
        </button>

        <button className="export-btn" onClick={btnExport} >
          <MdOutlineFileDownload size={18} color="#fff"/>
          <span>{exportar}</span>
        </button>
      </div>
    )
}