import React, { useState } from "react"
import MetaTags from 'react-meta-tags';

import {
  Card,
  CardBody,
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
  TabPane
} from "reactstrap"

import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../common/Breadcrumb";

const FormWizard = () => {
  const [activeTab, setactiveTab] = useState(1)
  const [activeTabProgress, setactiveTabProgress] = useState(1)
  const [progressValue, setprogressValue] = useState(25)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [poaAuthority, setPoaAuthority] = useState('No')

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

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Registration Form</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Wizard" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Basic Wizard</h4>
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
                            <span className="number">1.</span>{" "}
                            Personal Details
                          </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 2 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2)
                            }}
                          >
                            <span className="number">02</span>{" "}
                            Address
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
                            <span className="number">04</span>{" "}
                          POA
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
                                    <h5 className="font-size-14 mb-4">Title</h5>
                                    <div className="form-check mb-3">
                                      <Row>
                                      <Col lg="1" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="Mr"
                                          value="Mr"
                                          onChange={(e)=>setTitle(e.target.value)}
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="Mr"
                                        >
                                          Mr
                                        </label>
                                      </Col>
                                      <Col lg="1" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="Mrs"
                                          value="Mrs"
                                          onChange={(e)=>setTitle(e.target.value)}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="Mrs"
                                        >
                                          Mrs
                                        </label>
                                      </Col>
                                      <Col lg="1" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="Miss"
                                          value="Miss"
                                          onChange={(e)=>setTitle(e.target.value)}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="Miss"
                                        >
                                          Miss
                                        </label>
                                      </Col>
                                      <Col lg="1" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="Ms"
                                          value="Ms"
                                          onChange={(e)=>setTitle(e.target.value)}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="Ms"
                                        >
                                          Ms
                                        </label>
                                      </Col>
                                    </Row>
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
                          <TabPane tabId={2}>
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
                          <TabPane tabId={3}>
                            <div>
                              <Form>
                                <Row>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="contact1-name-input11">
                                        Contact # 1 Name 
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="contact1-name-input11"
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
                                      Contact # 1 Phone
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-cardno-input12"
                                      />
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-card-verification-input">
                                      Contact # 1 Email
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-card-verification-input"
                                      />
                                    </div>
                                  </Col>
                               
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-expiration-input13">
                                        Relationship with Contact # 1
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-expiration-input13"
                                      />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-namecard-input11">
                                        Contact # 2 Name 
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-namecard-input11"
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
                                        id="basicpill-cardno-input12"
                                      />
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-card-verification-input">
                                      Contact # 2 Email
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-card-verification-input"
                                      />
                                    </div>
                                  </Col>
                               
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-expiration-input13">
                                        Relationship with Contact # 2
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-expiration-input13"
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
                                  <div className="">
                                    <h5 className="font-size-14 mb-4">What Proof of ID (Photo ID) will you provide </h5>
                                    <div className="form-check ">
                                      <Row>
                                      <Col lg="12" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="exampleRadios1"
                                          value="option1"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="exampleRadios1"
                                        >
                                          Copy of Valid Drivers License
                                        </label>
                                      </Col>
                                      <Col lg="12" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="exampleRadios1"
                                          value="option1"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="exampleRadios1"
                                        >
                                          Copy of Valid Passport
                                        </label>
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
                                      <Col lg="12" className="mb-3">
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
                                        >
                                          Yes
                                        </label>
                                      </Col>
                                      <Col lg="12" className="mb-3">
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
                                        >
                                          No
                                        </label>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                                  </Col>
                                  {poaAuthority==='Yes' && <>
                                  <Col lg="6">
                                  <div className="mb-3">
                                    <h5 className="font-size-14 mb-4">Power of Attorney (POA) Title</h5>
                                    <div className="form-check mb-3">
                                      <Row>
                                      <Col lg="3" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="exampleRadios1"
                                          value="option1"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="exampleRadios1"
                                        >
                                          Mr
                                        </label>
                                      </Col>
                                      <Col lg="3" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="exampleRadios1"
                                          value="option1"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="exampleRadios1"
                                        >
                                          Mrs
                                        </label>
                                      </Col>
                                      <Col lg="3" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="exampleRadios1"
                                          value="option1"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="exampleRadios1"
                                        >
                                          Miss
                                        </label>
                                      </Col>
                                      <Col lg="3" className="mb-3">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="exampleRadios1"
                                          value="option1"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="exampleRadios1"
                                        >
                                          Ms
                                        </label>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-cstno-input7">
                                        POA First Name
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-cstno-input7"
                                      />
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-cstno-input7">
                                        POA Last Name
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-cstno-input7"
                                      />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-cstno-input7">
                                        POA Any Other Names
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-cstno-input7"
                                      />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-cstno-input7">
                                        POA Mobile Number
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-cstno-input7"
                                      />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-cstno-input7">
                                        POA Work Number
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-cstno-input7"
                                      />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-cstno-input7">
                                        POA Home Number
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-cstno-input7"
                                      />
                                    </div>
                                  </Col>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-cstno-input7">
                                        POA Email
                                  </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="basicpill-cstno-input7"
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
                          </li>
                          <li
                            className={activeTab === 4 ? "next disabled" : "next"}
                          >
                            <Link
                              to="#"
                              className="btn btn-primary"
                              onClick={() => {
                                toggleTab(activeTab + 1)
                              }}
                            >
                              Next
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
        </Container>
      </div>
    </React.Fragment>
  )
}

export default FormWizard
