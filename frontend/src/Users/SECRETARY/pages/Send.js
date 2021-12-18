import React, { useState, useEffect } from 'react';
import { PageHeader, Button } from 'antd';
import { Table } from 'react-bootstrap';
import * as AiIcons from 'react-icons/ai';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import moment from 'moment';
import '../page.css';
import Pdf from 'react-to-pdf';

const Send = () => {
   let history = useHistory();
   const location = useLocation();
   const { event_id } = location.state;
   const ref = React.createRef();
   const [filename, setFilename] = useState();
   const [reports, setReports] = useState([]);
   const chapter = localStorage.getItem('chapter');
   const name = localStorage.getItem('name');
   useForm();

   useEffect(() => {
      Axios.get(`http://localhost:5000/reports/get_report`, {
         params: {
            event_id: event_id,
         },
      }).then((response) => {
         setReports(response.data);
      });
   });

   return (
      <div className="container mt-3">
         <div className="row">
            <PageHeader
               className="site-page-header col-lg-10"
               onBack={() => history.goBack()}
               title="Back to Reports"
               subTitle={chapter}
            />{' '}
            <div className="my-3 col text-uppercase fs-5 mb-5">
               Send reports
            </div>
            {/* PDF */}
            <div className="">
               <Pdf targetRef={ref} filename={filename}>
                  {({ toPdf }) => (
                     <>
                        <div className="row pb-4">
                           <div className="col-lg-4">
                              <input
                                 type="text"
                                 placeholder="File name"
                                 className="form-control col-lg"
                                 required
                                 onChange={(e) => setFilename(e.target.value)}
                              />
                           </div>
                           <div className="col">
                              <Button
                                 type="primary"
                                 onClick={() => {
                                    toPdf();
                                 }}
                                 shape="round"
                                 icon={
                                    <>
                                       <AiIcons.AiOutlineDownload />{' '}
                                    </>
                                 }
                                 size="large"
                              >
                                 {' '}
                                 Download as PDF
                              </Button>{' '}
                              <a
                                 href="https://mail.google.com/mail/u/0/#inbox?compose=new"
                                 target="_blank"
                              >
                                 {' '}
                                 Send Email
                              </a>
                           </div>
                        </div>
                     </>
                  )}
               </Pdf>
               <div className="container shadow p-4 col-lg-9 mt-5">
                  <div ref={ref} className="post">
                     {reports.map((val) => {
                        return (
                           <>
                              <div className="text-center">
                                 <h2> Rotary International District 3850</h2>
                                 <h6>{val.chapter}</h6>
                              </div>

                              <div className="container col-lg mt-5">
                                 <Table className="border">
                                    <tr className>
                                       <td
                                          width="40%"
                                          className="text-uppercase"
                                       >
                                          Club Type
                                       </td>
                                       <td>Rotaract Club in Zamboanga City</td>
                                    </tr>
                                    <tr className>
                                       <td className="text-uppercase">
                                          Club Based
                                       </td>
                                       <td>Community Based</td>
                                    </tr>
                                    <tr className>
                                       <td className="text-uppercase">
                                          Club Name
                                       </td>
                                       <td>{val.chapter}</td>
                                    </tr>
                                    <tr className>
                                       <td className="text-uppercase">
                                          Event type
                                       </td>
                                       <td className="text-uppercase">
                                          {val.type}
                                       </td>
                                    </tr>
                                    <tr>
                                       <td className="text-uppercase">
                                          Event Title
                                       </td>
                                       <td>{val.title}</td>
                                    </tr>
                                    <tr>
                                       {' '}
                                       <td className="text-uppercase">
                                          Date(s)
                                       </td>
                                       <td>
                                          {moment(val.start).format('lll')} -{' '}
                                          {moment(val.end).format('lll')}
                                       </td>
                                    </tr>

                                    {val.type === 'virtual' ? (
                                       <>
                                          <tr>
                                             <td className="text-uppercase">
                                                Platform
                                             </td>
                                             <td>{val.platform}</td>
                                          </tr>
                                          <tr>
                                             <td className="text-uppercase">
                                                LINK / URL OF THE PROJECT
                                             </td>
                                             <td>
                                                <a href={val.link}>
                                                   {val.link}
                                                </a>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td className="text-uppercase">
                                                Event Host(s)
                                             </td>
                                             <td>{val.host}</td>
                                          </tr>
                                       </>
                                    ) : (
                                       <>
                                          <tr>
                                             {' '}
                                             <td className="text-uppercase">
                                                Source of Funds
                                             </td>
                                             <td>{val.source}</td>
                                          </tr>

                                          <tr>
                                             <td className="text-uppercase">
                                                Total cost
                                             </td>
                                             <td>{val.total_cost}</td>
                                          </tr>

                                          <tr>
                                             {' '}
                                             <td className="text-uppercase">
                                                VENUE(S) OF THE PROJECT
                                             </td>
                                             <td>{val.venue}</td>
                                          </tr>

                                          <tr>
                                             {' '}
                                             <td className="text-uppercase">
                                                Chairperson
                                             </td>
                                             <td>{val.chairperson}</td>
                                          </tr>
                                       </>
                                    )}

                                    <tr>
                                       <td className="text-uppercase">
                                          Participants
                                       </td>
                                       <td>{val.participants}</td>
                                    </tr>

                                    <tr>
                                       <td className="text-uppercase">
                                          Contact Email
                                       </td>
                                       <td>{val.email}</td>
                                    </tr>

                                    <tr>
                                       <td className="text-uppercase">
                                          PREPARED BY: (CLUB SECRETARY)
                                       </td>
                                       <td>{name}</td>
                                    </tr>
                                 </Table>
                              </div>
                           </>
                        );
                     })}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Send;
