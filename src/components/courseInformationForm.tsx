import React, { useState, useContext } from "react";
import { Form, Input, Select } from "antd";
import DataControllerContext from "./dataControllerContext";

interface Props {}

enum Session {
  Winter = 1,
  Summer = 2,
  Fall = 3
}

const CourseInformationForm: React.FC<Props> = () => {
    const [code, setSigle] = useState("");
    const [group, setGroupe] = useState(0);
    const [annee, setAnnee] = useState(0);
    const [session, setSession] = useState(1);

    const {notifyCourseFormSubmit} = useContext(DataControllerContext);

    const handleSubmit = (e: React.FormEvent) => {
        notifyCourseFormSubmit(code, group, annee, session);        
        return false;
    };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Sigle">
        <Input
          value={code}
          onChange={e => setSigle(e.target.value)}
          type="text"
        />
      </Form.Item>
      <Form.Item label="Groupe">
        <Input
          value={group}
          onChange={e => setGroupe(parseInt(e.target.value))}
          type="number"
        />
      </Form.Item>
      <Form.Item label="Année">
        <Input
          value={annee}
          onChange={e => setAnnee(parseInt(e.target.value))}
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