import React, { useState } from "react";
import { Form, Input, Select } from "antd";

interface Props {}

enum Session {
  Winter = 1,
  Summer = 2,
  Fall = 3
}

const CourseInformationForm: React.FC<Props> = () => {
    const [sigle, setSigle] = useState("");
    const [groupe, setGroupe] = useState(0);
    const [annee, setAnnee] = useState(0);
    const [session, setSession] = useState(1);

    const handleSubmit = async (e: React.FormEvent) => {

        const url = new URL('https://portail.etsmtl.ca/ICal/SeancesCours');
        url.searchParams.set('Sigle', sigle);
        url.searchParams.set('Groupe', groupe < 9 ? "0"+groupe : ""+groupe);
        url.searchParams.set('Session', annee+""+session);

        const finalUrl = `/api/proxy?url=${encodeURIComponent(url.href)}`;


        const data  = await fetch(finalUrl);

        console.log(data.text());

        return false;
    };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Sigle">
        <Input
          value={sigle}
          onChange={e => setSigle(e.target.value)}
          type="text"
        />
      </Form.Item>
      <Form.Item label="Groupe">
        <Input
          value={groupe}
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