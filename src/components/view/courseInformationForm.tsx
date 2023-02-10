import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Select } from "antd";
import {CalControllerContext} from "@/components/controller/calController";
import {getValue, setValue} from 'src/components/model/localStore'

interface Props {}

enum Session {
  Winter = 1,
  Summer = 2,
  Fall = 3
}

const CODE_STORE_KEY = 'code';
const GROUP_STORE_KEY = 'group';
const YEAR_STORE_KEY = 'year';
const SESSION_STORE_KEY = 'session';

const CourseInformationForm: React.FC<Props> = () => {
    const [code, setCode] = useState<string>("");
    const [group, setGroup] = useState<number>(0);
    const [year, setYear] = useState<number>(0);
    const [session, setSession] = useState<number>(Session.Fall);


    useEffect(()=>{
      setCode(getValue(CODE_STORE_KEY, '""'));
      setGroup(getValue(GROUP_STORE_KEY, 1));
      setYear(getValue(YEAR_STORE_KEY, new Date().getFullYear()));
      setSession(getValue(SESSION_STORE_KEY, Session.Fall));
    },[]);

    const {notifyCourseFormSubmit} = useContext(CalControllerContext);

    const handleSubmit = (e: React.FormEvent) => {
        setValue(CODE_STORE_KEY, code);
        setValue(GROUP_STORE_KEY, group);
        setValue(YEAR_STORE_KEY, year);
        setValue(SESSION_STORE_KEY, session);
        notifyCourseFormSubmit(code, group, year, session);        
        return false;
    };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Sigle">
        <Input
          value={code}
          onChange={e => setCode(e.target.value)}
          type="text"
        />
      </Form.Item>
      <Form.Item label="Groupe">
        <Input
          value={group}
          onChange={e => setGroup(parseInt(e.target.value))}
          type="number"
        />
      </Form.Item>
      <Form.Item label="Année">
        <Input
          value={year}
          onChange={e => setYear(parseInt(e.target.value))}
          type="number"
        />
      </Form.Item>
      <Form.Item label="Session">
        <Select
          value={session}
          onChange={setSession}
          style={{ width: 120 }}
        >
          <Select.Option value={Session.Winter}>Hiver</Select.Option>
          <Select.Option value={Session.Summer}>Été</Select.Option>
          <Select.Option value={Session.Fall}>Automne</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <button type="submit">Submit</button>
      </Form.Item>
    </Form>
  );
};

export default CourseInformationForm;