import React, { useState } from "react"
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
} from "reactstrap"

import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../common/Breadcrumb";
import SweetAlert from "react-bootstrap-sweetalert"
import axios from "axios";
import { serverAddress } from "../../constants";
import Paypal from "../PaymentMethods/Paypal"; 

const FormWizard = () => {
  const [activeTab, setactiveTab] = useState(1)
  const [activeTabProgress, setactiveTabProgress] = useState(1)
  const [progressValue, setprogressValue] = useState(25)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  const [membershipType, setMembershipType] = useState('individual');
  const [dependantParents, setDependantParents] = useState(0);
  const [dependantChildren, setDependantChildren] = useState(0);
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otherName, setOtherName] = useState('');
  const [dob, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [subrub, setSubrub] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [contactOneName, setContactOneName] = useState('');
  const [contactOneEmail, setContactOneEmail] = useState('');
  const [contactOnePhone, setContactOnePhone] = useState('');
  const [contactOneRelation, setContactOneRelation] = useState('');
  const [contactTwoName, setContactTwoName] = useState('');
  const [contactTwoEmail, setContactTwoEmail] = useState('');
  const [contactTwoPhone, setContactTwoPhone] = useState('');
  const [contactTwoRelation, setContactTwoRelation] = useState('');
  const [proofId, setProofId] = useState('');
  const [poaAuthority, setPoaAuthority] = useState('No')
  const [poaTitle, setPoaTitle] = useState('');
  const [poaFirstName, setPoaFirstName] = useState('');
  const [poaLastName, setPoaLastName] = useState('');
  const [poaOtherName, setPoaOtherName] = useState('');
  const [poaMobileNumber, setPoaMobileNumber] = useState('');
  const [poaHomeNumber, setPoaHomeNumber] = useState('');
  const [poaEmail, setPoaEmail] = useState('');
  const [poaWorkNumber, setPoaWorkNumber] = useState('');

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

  // function toggleTabProgress(tab) {
  //   if (activeTabProgress !== tab) {
  //     if (tab >= 1 && tab <= 4) {
  //       setactiveTabProgress(tab)

  //       if (tab === 1) {
  //         setprogressValue(25)
  //       }
  //       if (tab === 2) {
  //         setprogressValue(50)
  //       }
  //       if (tab === 3) {
  //         setprogressValue(75)
  //       }
  //       if (tab === 4) {
  //         setprogressValue(100)
  //       }
  //     }
  //   }
  // }

  const submitHandler = async () => {
    try{
      const {data} = await axios.post(`${serverAddress}/api/register`,{
        membershipType, dependantParents, dependantChildren, 
        title, firstName, lastName, otherName, dob, email, 
        phone, address, subrub, postalCode, state, contactOneName, 
        contactOneEmail, contactOnePhone, contactOneRelation, 
        contactTwoName, contactTwoEmail, contactTwoPhone, 
        contactTwoRelation, proofId, poaTitle, poaFirstName, 
        poaLastName, poaOtherName, poaMobileNumber, poaHomeNumber, 
        poaEmail, poaWorkNumber, poaAuthority, joiningFee, annualFee, total
      })
      setsuccess_msg({
        type: 'Success',
        message: 'You have registered successfully'
      })
      console.log("data===>", data)
    }catch (err) {
      console.log("error==>", err)
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Registration Form</title>
        </MetaTags>
        <Container fluid={true}>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="Form Wizard" /> */}

          <Row>
            <Col lg="12">
              <Card>
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
                            <span className="number">03</span>{" "}
                            Address
                          </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 4 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              setactiveTab(4)
                            }}
                          >
                            <span className="number">04</span>{" "}
                          Emergency Details
                        </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 5 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 5 })}
                            onClick={() => {
                              setactiveTab(5)
                            }}
                          >
                            <span className="number">05</span>{" "}
                          POA Details
                        </NavLink>
                        </NavItem>

                        <NavItem className={classnames({ current: activeTab === 6 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 6 })}
                            onClick={() => {
                              setactiveTab(6)
                            }}
                          >
                            <span className="number">06</span>{" "}
                          Payment
                        </NavLink>
                        </NavItem>
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
                                          value="individual"
                                          onChange={(e)=>{
                                            setMembershipType(e.target.value);
                                            setJoiningFee(joiningFeeObj.individual);
                                            setAnnualFee(annualFeeObj.individual);
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
                                          value="family"
                                          onChange={(e)=>{
                                            setMembershipType(e.target.value)
                                            setJoiningFee(joiningFeeObj.family);
                                            setAnnualFee(annualFeeObj.family);
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
                              {membershipType==='family' && 
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="dependant-parents">Dependant Parents</Label>
                                    <Input
                                      type="number"
                                      value={dependantParents}
                                      className="form-control"
                                      id="dependant-parents"
                                      onChange={(e)=>{
                                        setDependantParents(e.target.value);
                                        setJoiningFee(joiningFeeObj.family + joiningFeeObj.dependantParents*dependantParents);
                                        setAnnualFee(annualFeeObj.family + annualFeeObj.dependantParents*dependantParents);
                                      }}
                                    />
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="dependant-children">Dependant Children</Label>
                                    <Input
                                      type="number"
                                      value={dependantChildren}
                                      className="form-control"
                                      id="dependant-children"
                                      onChange={(e)=>{
                                        setDependantChildren(e.target.value)
                                        setJoiningFee(joiningFeeObj.family + joiningFeeObj.dependantChildren*dependantChildren);
                                        setAnnualFee(annualFeeObj.family + annualFeeObj.dependantChildren*dependantChildren); 
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
                                      <select className="form-control" onChange={(e)=>setTitle(e.target.value)}>
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
                                      onChange={(e)=>setFirstName(e.target.value)}
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
                                      onChange={(e)=>setLastName(e.target.value)}
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
                                      onChange={(e)=>setOtherName(e.target.value)}
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
                                      onChange={(e)=>setDOB(e.target.value)}
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
                                      onChange={(e)=>setEmail(e.target.value)}
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
                                      onChange={(e)=>setPhone(e.target.value)}
                                      />
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </TabPane>

                          <TabPane tabId={3}>
                            <div>
                              <Form>
                                <Row>
                                  <Col lg="12">
                                    <div className="mb-3">
                                      <Label for="address-input1">Address</Label>
                                      <textarea
                                        id="address-input1"
                                        className="form-control"
                                        rows="2"
                                        onChange={(e)=>setAddress(e.target.value)}
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
                                        onChange={(e)=>setSubrub(e.target.value)}
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
                                        onChange={(e)=>setState(e.target.value)}
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
                                        onChange={(e)=>setPostalCode(e.target.value)}
                                      />
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
                                    <div className="mb-3">
                                      <Label for="contact1-name-input11">Contact # 1 Name</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact1-name-input11"
                                        onChange={(e)=>setContactOneName(e.target.value)}
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
                                        onChange={(e)=>setContactOnePhone(e.target.value)}
                                      />
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact1-email-input">Contact # 1 Email</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact1-email-input"
                                        onChange={(e)=>setContactOneEmail(e.target.value)}
                                      />
                                    </div>
                                  </Col>
                               
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact1-relation-input13">Relationship with Contact # 1</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact1-relation-input13"
                                        onChange={(e)=>setContactOneRelation(e.target.value)}
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
                                        onChange={(e)=>setContactTwoName(e.target.value)}
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
                                      <Label for="basicpill-cardno-input12">
                                      Contact # 2 Phone
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact2-phone-input12"
                                        onChange={(e)=>setContactTwoPhone(e.target.value)}
                                      />
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact-email-input">Contact # 2 Email</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact2-email-input"
                                        onChange={(e)=>setContactTwoEmail(e.target.value)}
                                      />
                                    </div>
                                  </Col>
                               
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact2-relation-input13">Relationship with Contact # 2</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact2-relation-input13"
                                        onChange={(e)=>setContactTwoRelation(e.target.value)}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </TabPane>
                          <TabPane tabId={5}>
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
                                          onChange={(e)=>setProofId(e.target.value)}
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
                                          onChange={(e)=>setProofId(e.target.value)}
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
                                          onChange={(e)=>setPoaAuthority(e.target.value)}
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
                                          onChange={(e)=>setPoaAuthority(e.target.value)}
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
                                  {poaAuthority==='Yes' && <>
                                  
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label className="">Title</Label>
                                      <div className="">
                                        <select className="form-control" onChange={(e)=>setTitle(e.target.value)}>
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
                                        onChange={(e)=>setPoaFirstName(e.target.value)}
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
                                        onChange={(e)=>setPoaLastName(e.target.value)}
                                        />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-othername-input7">POA Any Other Names</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="poa-othername-input7"
                                        onChange={(e)=>setPoaOtherName(e.target.value)}
                                        />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-mobile-input7">POA Mobile Number</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="bpoa-mobile-input7"
                                        onChange={(e)=>setPoaMobileNumber(e.target.value)}
                                        />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-work-input7">POA Work Number</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="poa-work-input7"
                                        onChange={(e)=>setPoaWorkNumber(e.target.value)}
                                        />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-home-input7">POA Home Number</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="poa-home-input7"
                                        onChange={(e)=>setPoaHomeNumber(e.target.value)}
                                        />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="poa-email-input7">POA Email</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="poa-email-input7"
                                      />
                                    </div>
                                  </Col></>}
                                </Row>
                              </Form>
                            </div>
                          </TabPane>

                          <TabPane tabId={6}>
                            <Row>
                              <Col lg="8">
                                <Card className="shadow-none border ">
                                <CardBody className="p-2">
                                  <CardTitle className="mb-4">
                                    Membership Details
                                  </CardTitle>

                                  <div className="table-responsive">
                                    <Table className="table align-middle mb-0 ">
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
                                              {membershipType.toUpperCase()}
                                            </th>
                                            <td>
                                              <h5 className="font-size-14 text-truncate">
                                                ${joiningFee}
                                              </h5>
                                            </td>
                                            <td>
                                              ${annualFee}
                                            </td>
                                          </tr>

                                        <tr>
                                          <td colSpan="2">
                                            <h6 className="m-0 text-end">
                                              Total: 
                                            </h6>
                                          </td>
                                          <td>${joiningFee + annualFee }</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col lg={4}>
                              <Paypal />
                            </Col>
                            </Row>
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
                            className={activeTab === 5 ? "next disabled" : "next"}
                          >
                            <Link
                              to="#"
                              className="btn btn-primary"
                              onClick={() => {
                                toggleTab(activeTab + 1);
                                activeTab===6 &&  submitHandler();
                              }}
                            >
                              {activeTab===6? 'Finish':'Next'}
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
              setsuccess_msg(null)
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
