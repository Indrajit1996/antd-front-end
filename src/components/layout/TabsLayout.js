import React from 'react';
import { Tabs } from 'antd';
import Todos from '../todos/Todos';
import Users from '../users/Users';


const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function TabsLayout() {

  return (
    <div >
        <Tabs defaultActiveKey="1" size={'default'}  onChange={callback}>
          <TabPane tab="Todos" key="1" >
            <Todos />
          </TabPane>
          <TabPane tab="Users" key="2" >
            <Users />
          </TabPane>
        </Tabs>

    </div>

  );
}

export default TabsLayout;
