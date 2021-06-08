import React, { useContext, useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  Table,
  TabPane
} from "reactstrap";

import classnames from "classnames"
import { Link, useHistory } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../common/Breadcrumb";
import SweetAlert from "react-bootstrap-sweetalert"
import axios from "axios";
import {useDispatch} from 'react-redux';
import { serverAddress } from "../../constants/serverConstants";
import { Context } from "../../context/AppContext"
import { sendEmailBackend } from "../../actions/emailActions";

const FormWizard = () => {
  const { registrationVariables, setRegistrationVariables, registration, setRegistration} = useContext(Context);
  const dispatch = useDispatch();
  const [activeTab, setactiveTab] = useState(1)
  const [activeTabProgress, setactiveTabProgress] = useState(1)
  const [progressValue, setprogressValue] = useState(25)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  const joiningFeeObj = {
    individual : 50,
    family : 100,
    dependantChildren : 25,
    dependantParents : 25
  };

  const annualFeeObj = {
    individual : 150,
    family : 300,
    dependantChildren : 50,
    dependantParents : 50
  };

  const [joiningFee, setJoiningFee] = useState(50);
  const [annualFee, setAnnualFee] = useState(150);
  const [total, setTotal] = useState(joiningFee + annualFee);

  const [success_msg, setsuccess_msg] = useState(null);

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab)
      }
    }
  }

  function handleChange(target,value) {
    setRegistrationVariables(prevState => ({ ...prevState,[target] : value}))
    // console.log("pointVariables",pointVariables);
  }

  useEffect(() => {
    handleChange( "joiningFee", joiningFeeObj.family + joiningFeeObj.dependantParents*registrationVariables.dependantParents + joiningFeeObj.dependantChildren*registrationVariables.dependantChildren);
    handleChange( "annualFee", annualFeeObj.family + annualFeeObj.dependantParents*registrationVariables.dependantParents + annualFeeObj.dependantChildren*registrationVariables.dependantChildren);
  }, [registrationVariables.dependantParents, registrationVariables.dependantChildren])


  useEffect(() => {
    handleChange(registrationVariables.joiningFee + registrationVariables.annualFee)
  }, [registrationVariables.joiningFee, registrationVariables.annualFee])


  const submitHandler = async () => {
    try{
      const {data} = await axios.post(`${serverAddress}/api/register`, registrationVariables);
      setRegistration(data);
      // dispatch(saveRegistration(data));
      const receiver = registrationVariables.email;
      const subject = 'Confirmation Email';
      const emailTemplate = `<h3>Hi ${registrationVariables.firstName}, you have registered successfully for the membership</h3> \n 
      <p>Here are the details of your membership:</p> 
      <br>
      <table className="table align-middle mb-0 ">
                                      <thead className="table-light">
                                        <tr>
                                          <th scope="col">Type</th>
                                          <th scope="col">Joining Fee</th>
                                          <th scope="col">Annual Fee</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                            <th scope="row">
                                              ${registrationVariables.membershipType}
                                            </th>
                                            <td>
                                              <h5 className="font-size-14 text-truncate">
                                                ${registrationVariables.joiningFee}
                                              </h5>
                                            </td>
                                            <td>
                                              ${registrationVariables.annualFee}
                                            </td>
                                          </tr>

                                        <tr>
                                          <td colSpan="2">
                                            <h6 className="m-0 text-end">
                                              Total: 
                                            </h6>
                                          </td>
                                          <td>${registrationVariables.total }</td>
                                        </tr>
                                      </tbody>
                                    </table>`;

      dispatch(sendEmailBackend(receiver, subject, emailTemplate));
      dispatch(sendEmailBackend('siddiqui@hotmail.co.uk', subject, 'Member Registered'));

      setsuccess_msg({
        type: 'Success',
        message: 'You have registered successfully'
      })
      console.log("data===>", data)
    }catch (err) {
      console.log("error==>", err)
    }
  };

  const history = useHistory();

  const confirmHandler = ()=>{
    setsuccess_msg(null)
    history.push('/payment', { 
      membershipType:registrationVariables.membershipType,
      joiningFee: registrationVariables.joiningFee, 
      annualFee: registrationVariables.annualFee, 
      total: registrationVariables.total });
  };

  console.log("joining fee==>", joiningFee);
  console.log("annual fee==>", annualFee);
  console.log("total fee==>", total);

  console.log("registration Variables==>", registrationVariables);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Registration Form</title>
        </MetaTags>
        <Container fluid={true}>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="Form Wizard" /> */}
          <Row>
            <Col lg="9" className="m-auto">

              <Card className="p-3">
                <CardTitle>Member Registration Form</CardTitle>
                <CardBody>
                  <h4 className="card-title mb-4">Register Here</h4>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}>
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1)
                            }}
                          >
                            <span className="number">01.</span>{" "}
                            Membership 
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}>
                          <NavLink
                            className={classnames({ current: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2)
                            }}
                          >
                            <span className="number">02.</span>{" "}
                            Personal Details
                          </NavLink>
                        </NavItem>
                        
                        <NavItem className={classnames({ current: activeTab === 3 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3)
                            }}
                          >
                            <span className="number">03.</span>{" "}
                          Emergency Details
                        </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 4 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              setactiveTab(4)
                            }}
                          >
                            <span className="number">04.</span>{" "}
                          POA Details
                        </NavLink>
                        </NavItem>

                        {/* <NavItem className={classnames({ current: activeTab === 5 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 5 })}
                            onClick={() => {
                              setactiveTab(5)
                            }}
                          >
                            <span className="number">05</span>{" "}
                          Payment
                        </NavLink>
                        </NavItem> */}
                      </ul>
                      
                      <div className="mt-4">
                        <TabContent
                          activeTab={activeTab}
                        >

                          <TabPane tabId={1}>
                            <Form>
                              <Row>
                                <Col lg="12">
                                  <div className="mb-3">
                                    <h5 className="font-size-14 mb-4">Select type of membership</h5>
                                    <div className="form-check mb-3">
                                      <Row>
                                      <Col lg="2" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="individual"
                                          value="Individual"
                                          onChange={(e)=>{
                                            handleChange("membershipType",e.target.value);
                                            handleChange("joiningFee", joiningFeeObj.individual);
                                            handleChange("annualFee", annualFeeObj.individual);
                                          }}
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="individual"
                                        >
                                          Individual
                                        </label>
                                      </Col>
                                      <Col lg="2" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="family"
                                          value="Family"
                                          onChange={(e)=>{
                                            handleChange("membershipType",e.target.value);
                                            handleChange("joiningFee", joiningFeeObj.individual);
                                            handleChange("annualFee", annualFeeObj.individual);
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="family"
                                        >
                                          Family
                                        </label>
                                      </Col>
                                    </Row>
                                  </div>

                                </div>
                              </Col>
                              {registrationVariables.membershipType==='Family' && 
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="dependant-parents">Dependant Parents</Label>
                                    <Input
                                      type="number"
                                      value={registrationVariables.dependantParents}
                                      className="form-control"
                                      id="dependant-parents"
                                      onChange={(e)=>{
                                        handleChange("dependantParents", e.target.value)
                                      }}
                                    />
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="dependant-children">Dependant Children</Label>
                                    <Input
                                      type="number"
                                      value={registrationVariables.dependantChildren}
                                      className="form-control"
                                      id="dependant-children"
                                      onChange={(e)=>{
                                        handleChange("dependantChildren", e.target.value)
                                      }}
                                      />
                                  </div>
                                </Col>
                                </Row>}
                              </Row>
                            </Form>
                          </TabPane>


                          <TabPane tabId={2}>  
                            <Form>
                              <Row>
                                <Col lg="12">
                                  <div className="mb-3">
                                    <label className="col-form-label">Title</label>
                                    <div className="">
                                      <select className="form-control" 
                                        value={registrationVariables.title}
                                        onChange={(e)=>handleChange("title",e.target.value)}>
                                        <option>Please select title</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Miss">Miss</option>
                                        <option value="Mrs">Mrs</option>
                                      </select>
                                    </div>
                                </div>
                              </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="firstname-input1">First name</Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="firstname-input1"
                                      value = {registrationVariables.firstName}
                                      onChange={(e)=>handleChange("firstName",e.target.value)}
                                    />
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="lastname-input2">Last name</Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="lastname-input2"
                                      value={registrationVariables.lastName}
                                      onChange={(e)=>handleChange("lastName", e.target.value)}
                                      />
                                  </div>
                                </Col>
                                
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="othername-input2">Any other given name</Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="lastname-input2"
                                      value={registrationVariables.otherName}
                                      onChange={(e)=>handleChange("otherName", e.target.value)}
                                      />
                                  </div>
                                </Col>
                                <Col lg="6">
                                <div className="mb-3">
                                  <Label for="dob">Date of birth</Label>
                                    <Input
                                      className="form-control"
                                      type="date"
                                      defaultValue="2019-08-19"
                                      id="dob"
                                      value={registrationVariables.dob}
                                      onChange={(e)=>handleChange("dob", e.target.value)}
                                      />
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="email">Email</Label>
                                    <Input
                                      type="email"
                                      className="form-control"
                                      id="email"
                                      value={registrationVariables.email}
                                      onChange={(e)=>handleChange("email", e.target.value)}
                                      />
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="phoneno-input3">Phone</Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="phoneno-input3"
                                      value={registrationVariables.phone}
                                      onChange={(e)=>handleChange("phone", e.target.value)}
                                      />
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                  <Col lg="12">
                                    <div className="mb-3">
                                      <Label for="address-input1">Address</Label>
                                      <textarea
                                        id="address-input1"
                                        className="form-control"
                                        rows="2"
                                        value={registrationVariables.address}
                                        onChange={(e)=>handleChange("address", e.target.value)}
                                        />
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="subrub-input6">Subrub</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="subrub-input6"
                                        value={registrationVariables.subrub}
                                        onChange={(e)=>handleChange("subrub", e.target.value)}
                                        />
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="state-input7">
                                        State
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="state-input7"
                                        value={registrationVariables.state}
                                        onChange={(e)=>handleChange("state", e.target.value)}
                                        />
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="postalcode-input8">Postal code</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="postalcode-input8"
                                      value={registrationVariables.postalCode}
                                      onChange={(e)=>handleChange("postalCode", e.target.value)}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                            </Form>
                          </TabPane>
{/* 
                          <TabPane tabId={3}>
                            <div>
                              <Form>
                                
                              </Form>
                            </div>
                          </TabPane> */}
                          <TabPane tabId={3}>
                            <div>
                              <Form>
                                <Row>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact1-name-input11">Contact # 1 Name</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact1-name-input11"
                                        value={registrationVariables.contactOneName}
                                        onChange={(e)=>handleChange("contactOneName", e.target.value)}
                                      />
                                    </div>
                                  </Col>

                                  {/* <Col lg="6">
                                    <div className="mb-3">
                                      <Label>Credit Card Type</Label>
                                      <select className="form-select">
                                        <option defaultValue>
                                          Select Card Type
                                    </option>
                                        <option value="AE">American Express</option>
                                        <option value="VI">Visa</option>
                                        <option value="MC">MasterCard</option>
                                        <option value="DI">Discover</option>
                                      </select>
                                    </div>
                                  </Col> */}
       
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact1-phone-input12">Contact # 1 Phone</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact1-phone-input12"
                                        value={registrationVariables.contactOnePhone}
                                        onChange={(e)=>handleChange("contactOnePhone", e.target.value)}                                      />
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact1-email-input">Contact # 1 Email</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact1-email-input"
                                        value={registrationVariables.contactOneEmail}
                                        onChange={(e)=>handleChange("contactOneEmail", e.target.value)}                                      />
                                    </div>
                                  </Col>
                               
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact1-relation-input13">Relationship with Contact # 1</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact1-relation-input13"
                                        value={registrationVariables.contactOneRelation}
                                        onChange={(e)=>handleChange("contactOneRelation", e.target.value)}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact2-input11">Contact # 2 Name</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact2-input11"
                                        value={registrationVariables.contactTwoName}
                                        onChange={(e)=>handleChange("contactTwoName", e.target.value)}                                      />
                                    </div>
                                  </Col>

                                  {/* <Col lg="6">
                                    <div className="mb-3">
                                      <Label>Credit Card Type</Label>
                                      <select className="form-select">
                                        <option defaultValue>
                                          Select Card Type
                                    </option>
                                        <option value="AE">American Express</option>
                                        <option value="VI">Visa</option>
                                        <option value="MC">MasterCard</option>
                                        <option value="DI">Discover</option>
                                      </select>
                                    </div>
                                  </Col> */}
       
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-cardno-input12">
                                      Contact # 2 Phone
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact2-phone-input12"
                                        value={registrationVariables.contactTwoPhone}
                                        onChange={(e)=>handleChange("contactTwoPhone", e.target.value)}                                         />
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact-email-input">Contact # 2 Email</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact2-email-input"
                                        value={registrationVariables.contactTwoEmail}
                                        onChange={(e)=>handleChange("contactTwoEmail", e.target.value)}                                         />
                                    </div>
                                  </Col>
                               
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact2-relation-input13">Relationship with Contact # 2</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact2-relation-input13"
                                        value={registrationVariables.contactTwoRelation}
                                        onChange={(e)=>handleChange("contactTwoRelation", e.target.value)}                                         />
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </TabPane>
                          <TabPane tabId={4}>
                          <div>
                              <Form>
                                <Row>
                                  <Col lg="6">
                                  <div className="">
                                    <h5 className="font-size-14 mb-4">What Proof of ID (Photo ID) will you provide </h5>
                                    <div className="form-check ">
                                      <Row>
                                      <Col lg="6" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="proofId"
                                          id="proofid-licence"
                                          value="Licence"
                                          onChange={(e)=>handleChange("proofId", e.target.value)}
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="proofid-licence"
                                        >Copy of Valid Drivers License</label>
                                      </Col>
                                      <Col lg="6" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="proofId"
                                          id="proofId-passport"
                                          onChange={(e)=>handleChange("proofId", e.target.value)}
                                          value="Passport"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="proofId-passport"
                                        >Copy of Valid Passport</label>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                                  </Col>
                                  <Col lg="6">
                                  <div className="">
                                    <h5 className="font-size-14 mb-4">Do you have an executor or a power of Attorney that authorize particular individual to act on your behalf? </h5>
                                    <div className="form-check ">
                                      <Row>
                                      <Col lg="2" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="PoaAuthority"
                                          id="yes-poa"
                                          value="Yes"
                                          onChange={(e)=>handleChange("poaAuthority", e.target.value)}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="yes-poa"
                                        >Yes</label>
                                      </Col>
                                      <Col lg="2" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="PoaAuthority"
                                          id="no-poa"
                                          value="No"
                                          onChange={(e)=>handleChange("poaAuthority", e.target.value)}
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="no-poa"
                                        >No</label>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                                  </Col>
                                  {registrationVariables.poaAuthority==='Yes' && <>
                                  
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label className="">Title</Label>
                                      <div className="">
                                        <select className="form-control" 
                                          onChange={(e)=>handleChange("poaTitle", e.target.value)}
                                          value ={registrationVariables.poaTitle}
                                        >
                                          <option>Please select title</option>
                                          <option value="Mr">Mr</option>
                                          <option value="Mrs">Mrs</option>
                                          <option value="Miss">Miss</option>
                                          <option value="Mrs">Mrs</option>
                                        </select>
                                      </div>
                                  </div>
                                </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-firstname-input7">POA First Name</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="poa-firstname-input7"
                                        value={registrationVariables.poaFirstName}
                                        onChange={(e)=>handleChange("poaFirstName", e.target.value)}
                                        />
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-lastname-input7">POA Last Name</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="poa-lastname-input7"
                                        value={registrationVariables.poaLastName}
                                        onChange={(e)=>handleChange("poaLastName", e.target.value)}                                        />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-othername-input7">POA Any Other Names</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="poa-othername-input7"
                                        value={registrationVariables.poaOtherName}
                                        onChange={(e)=>handleChange("poaOtherName", e.target.value)}                                        />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-mobile-input7">POA Mobile Number</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="bpoa-mobile-input7"
                                        value={registrationVariables.poaMobileNumber}
                                        onChange={(e)=>handleChange("poaMobileNumber", e.target.value)}                                        />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-work-input7">POA Work Number</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="poa-work-input7"
                                        value={registrationVariables.poaWorkNumber}
                                        onChange={(e)=>handleChange("poaWorkNumber", e.target.value)}                                        />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-home-input7">POA Home Number</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="poa-home-input7"
                                        value={registrationVariables.poaHomeNumber}
                                        onChange={(e)=>handleChange("poaHomeNumber", e.target.value)}                                        />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-email-input7">POA Email</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="poa-email-input7"
                                        value={registrationVariables.poaEmail}
                                        onChange={(e)=>handleChange("poaEmail", e.target.value)}
                                      />
                                    </div>
                                  </Col></>}
                                </Row>
                              </Form>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
                      <div className="actions clearfix">
                        <ul>
                          {activeTab!==1 &&
                          <li
                            className={
                              activeTab === 1 ? "previous disabled" : "previous"
                            }
                          >
                            <Link
                              to="#"
                              className="btn btn-primary"
                              onClick={() => {
                                toggleTab(activeTab - 1)
                              }}
                            >
                              Previous
                          </Link>
                          </li>}
                          <li
                            className={activeTab === 4 ? "next disabled" : "next"}
                          >
                            <Link
                              to="#"
                              className="btn btn-primary"
                              onClick={() => {
                                toggleTab(activeTab + 1);
                                activeTab===4 &&  submitHandler();
                              }}
                            >
                              {activeTab===4? 'Finish':'Next'}
                          </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {success_msg && 
          <SweetAlert
            title={success_msg.type}
            success
            confirmBtnBsStyle="success"
            cancelBtnBsStyle="danger"
            onConfirm={() => {
              confirmHandler();
            }}
            onCancel={() => {
              setsuccess_msg(null)
            }}
          >
            {success_msg.message}
          </SweetAlert>}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default FormWizard
