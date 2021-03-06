import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import API from '../../utils/API';

// external stylesheet & bootstrap components
import './jobs.css';
// import { Col, Row, Container } from '../../components/Grid';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

class Jobs extends Component {
  state = {
    open: false,
    jobs:[],
    jobLink:'',
    jobTitle:'',
    jobCompany: ''
  };

  // componentDidMount(){
  //   this.loadJobs();
  // }

  // loadJobs = ()=>{
  //   API.findJobs()
  //     .then(res => this.setState({jobs: res.data}))
  //     .catch(err => console.log(err));
  // }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  //on form submission 
  handleJobFormSubmit = event =>{
    event.preventDefault();
    this.setState({
      jobLink: '',
      jobTitle: '',
      jobCompany: '',
      jobComments:''
    });
    const newJob= {
      company: this.state.jobCompany,
      link: this.state.jobLink,
      title: this.state.jobTitle,
      // comment: this.state.jobCompany
    }
    API.createJobs(newJob).then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
  }


  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <h2>Employment Opportunities</h2>
        <button onClick={this.onOpenModal}>Post Jobs</button>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Post your job leads here!</h2>
          <form className="form-inline">
           {/* Job Link */}
            <label className="sr-only">Copy link to job here (required)</label>
            <input type="text"
                   value={this.state.jobLink}
                   name='jobLink'
                   onChange={this.handleInputChange}
                   className="form-control mb-2 mr-sm-2 mb-sm-0"
                   id="inlineFormInput" 
                   placeholder='Copy link to job here' 
                   required/>
            {/* Job Title */}
            <label className="sr-only">Job Title</label>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group-addon"></div>
              <input type="text"
                     value={this.state.jobTitle}
                     name='jobTitle'
                     onChange={this.handleInputChange}
                     className="form-control" 
                     id="inlineFormInputGroup" 
                     placeholder="Job Title"/>
            </div>
             {/* Company */}
            <label className="sr-only">Company</label>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group-addon"></div>
              <input type="text"
                     value={this.state.jobCompany}
                     name='jobCompany'
                     onChange={this.handleInputChange}
                     className="form-control"
                     id="inlineFormInputGroup"
                     placeholder="Company Name" />
            </div>
            {/* Comments */}
            {/* <label className="sr-only">Comments about job</label>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group-addon"></div>
              <input type="text"
                value={this.state.jobComments}
                name='jobComments'
                onChange={this.handleInputChange}
                className="form-control"
                id="inlineFormInputGroup"
                placeholder="Comments" />
            </div> */}
            <button type="submit"
                    onClick={this.handleJobFormSubmit}
                    className="btn btn-primary">Submit</button>
          </form>
        </Modal>
      </div>
    );
  }
}
  
  export default Jobs;