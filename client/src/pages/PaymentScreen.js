import React from 'react'
import { MetaTags } from 'react-meta-tags'
import { useLocation } from 'react-router'
import { Card, CardBody, CardTitle, Col, Container, Row, Table } from 'reactstrap'
import FormWizard from '../components/Forms/FormWizard'
import Paypal from '../components/PaymentMethods/Paypal'

function PaymentScreen() {
    const {state} = useLocation();
    const { membershipType, joiningFee, annualFee, total } = state; 

    console.log("state==>", state)
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                <title>Payment Screen</title>
                </MetaTags>
                <Container fluid={true}>
                {/* <Breadcrumbs title="Forms" breadcrumbItem="Form Wizard" /> */}
                    <Row>
                        <Col lg="8" className="m-auto">
                            <Card className="p-3">
                                <CardBody className="p-0">
                                    <h4 className="card-title mb-4">Payment Summary</h4>
                                    <div className="wizard clearfix">
                                        <div className="steps clearfix">
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
                                              {membershipType}
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
                                          <td>${total }</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                        <Card className="p-3">
                            <CardBody>
                                <CardTitle>Pay here</CardTitle>
                                <Paypal value={total}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    </React.Fragment>
    )
}

export default PaymentScreen
