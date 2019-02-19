import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import  * as RecordsAPI from '../utils/RecordsAPI';
import AmountBox from './AmountBox';
class Records extends Component {
  constructor(){
    super();
    this.state = {
      error:null,
      isLoaded:false,
      records:[]
    }
  }

    componentDidMount(){
        RecordsAPI.getAll().then(
            response=>this.setState({
                records:response.data,
                isLoaded:true,
            })
    ).catch(
        error=>this.setState({
          isLoaded:true,
          error:error
        })
    )
  }
    addRecord(record){
        this.setState({
            isLoaded:true,
            error:null,
            records:[
                ...this.state.records,
                record
            ]
        })
    }
    updateRecord(record,data){
            const recordIndex = this.state.records.indexOf(record);
            const newRecords  = this.state.records.map((item,index)=>{
                if (index!==recordIndex){
                    return item
                }
                return {
                    ...item,
                    ...data
                }
        })
        this.setState({
            records:newRecords
        })
        // console.log(record,data,'this is records.js');
    }

    deleteRecord(record){
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.filter((item,index)=> index !== recordIndex);
        this.setState({
            records:newRecords
        })
    }

    credits(){
      let credits =this.state.records.filter(record=>{
          return record.amount>=0;
      });
        return credits.reduce((prev,curr)=>{
            return prev+Number.parseInt(curr.amount,0)
        },0)
    }
    debits(){
        let credits =this.state.records.filter(record=>{
            return record.amount<0;
        })
        return credits.reduce((prev,curr)=>{
            return prev+Number.parseInt(curr.amount,0)
        },0)
    }

    balance(){
      return this.credits()+this.debits();
    }
  render() {
    const {error,isLoaded} = this.state;
    let recordsComponent ;

    if (error) {
      recordsComponent = <div>Error:{error.message}</div>;
    }else if(!isLoaded){
      recordsComponent = <div>Loading...</div>;
    }else {
      recordsComponent = (
          <div className="App">
            <table className="table table-bordered">
              <thead>
              <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {this.state.records.map((record)=><Record key = {record.id} record = {record} handleEditRecord={this.updateRecord.bind(this)} handleDeleteRecord={this.deleteRecord.bind(this)}/>)}
              </tbody>
            </table>
          </div>
      );
    }
    return(
        <div>
            <h2>Records</h2>
            <div className="row mb-3">
                <AmountBox text="总收入" type="success" amount={this.credits()}/>
                <AmountBox text="总支出"  type="danger" amount={this.debits()}/>
                <AmountBox text="剩余" type="info" amount={this.balance()}/>
            </div>
            <RecordForm handleNewRecord = {this.addRecord.bind(this)}/>
            {recordsComponent}
        </div>
    )
  }

}


export default Records ;
