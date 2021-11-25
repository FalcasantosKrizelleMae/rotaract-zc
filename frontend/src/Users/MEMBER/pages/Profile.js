import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';
import { Avatar, Image, Card, PageHeader } from 'antd';

function Profile() {
   let history = useHistory();
   const location = useLocation();
   const chapter = localStorage.getItem('chapter');
   const id = localStorage.getItem('member_id');
   const name = localStorage.getItem('name');
   // const status = localStorage.getItem('status');
   const tabListNoTitle = [
      {
         key: 'transactions',
         tab: 'Transactions',
      },
      {
         key: 'account',
         tab: 'Account',
      },
      {
         key: 'history',
         tab: 'History',
      },
   ];

   const contentListNoTitle = {
      transactions: <p>transactiion content</p>,
      account: <p>My account content</p>,
      history: <p>project content</p>,
   };

   const [activeTabKey, setActiveTabKey] = useState('transactions');

   const onTabChange = (key) => {
      setActiveTabKey(key);
   };

   return (
      <div>
         <div className="container my-2">
            <PageHeader
               className="site-page-header"
               onBack={() => history.push(`/member/${id}`)}
               title="My Account"
               // subTitle="View and update account"
            />
            ,
            <div className="row">
               <div className="col mt-2">
                  {' '}
                  <Card
                     className="rounded shadow-sm"
                     actions={[
                        <BiIcons.BiEditAlt size="17px" />,
                        <BiIcons.BiSave size="17px" />,
                     ]}
                     cover={
                        <Avatar
                           alt="example"
                           style={{ width: '100%', height: '100%' }}
                           shape="square"
                           className="img-fluid img-responsive bg-light"
                           src={
                              <Image src="https://joeschmoe.io/api/v1/random" />
                           }
                        />
                     }
                  >
                     <div className="info">
                        <h6 className="text-secondary mb-4">MEMBER ID: {id}</h6>
                        <h4>{name}</h4>
                        <h6 className="price mt-2 text-secondary">{chapter}</h6>
                     </div>
                  </Card>
               </div>

               <div className="col-lg-8  d-flex justify-content-center mt-2">
                  <Card style={{ width: '100%' }} className="rounded shadow-sm">
                     <Card.Grid hoverable={false} style={{ width: '100%' }}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                     </Card.Grid>
                     <Card.Grid hoverable={false} style={{ width: '100%' }}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                     </Card.Grid>
                     <Card.Grid hoverable={false} style={{ width: '100%' }}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                     </Card.Grid>
                  </Card>
               </div>
            </div>
            <div className="col px-0">
               <Card
                  className="rounded shadow-sm"
                  style={{ width: '100%', marginTop: 20 }}
                  bordered={false}
                  tabList={tabListNoTitle}
                  activeTabKey={activeTabKey}
                  onTabChange={(key) => {
                     onTabChange(key);
                  }}
               >
                  {contentListNoTitle[activeTabKey]}
               </Card>
            </div>
         </div>
      </div>
   );
}

export default Profile;
