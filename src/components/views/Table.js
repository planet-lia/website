import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

class Table extends Component {

  render(){
    return (
      <BootstrapTable
        data = {this.props.data}
        columns = {this.props.columns}
        keyField={this.props.keyField}
				noDataIndication={"No data to display"}
				hover
				condensed
      />
    );
  }
  
}

export default Table;
