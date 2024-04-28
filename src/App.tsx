import { Flex, Typography, Form, InputNumber, Button, Statistic } from "antd";
import type { StatisticProps } from "antd";
import { useState } from "react";
import CountUp from "react-countup";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

const App = () => {
  const [result, setResult] = useState<number>();

  const [form] = Form.useForm();

  return (
    <Flex gap={8} vertical>
      <Flex>
        <Typography.Title>金币计算器</Typography.Title>
      </Flex>
      <Flex vertical>
        <Form layout="vertical" form={form}>
          <Form.Item
            label="商品价格"
            required
            rules={[{ required: true }]}
            name={"price"}
          >
            <InputNumber
              style={{ width: "100%" }}
              required
              placeholder="31222"
            />
          </Form.Item>
          <Form.Item
            label="金币比例"
            required
            rules={[{ required: true }]}
            name={"proportion"}
          >
            <InputNumber placeholder="40" style={{ width: "100%" }} required />
          </Form.Item>
        </Form>
      </Flex>
      {result && (
        <Statistic
          title="商品金额 (CNY)"
          value={result}
          precision={2}
          formatter={formatter}
        />
      )}
      <Button
        type="primary"
        size="large"
        onClick={async () => {
          try {
            const { price, proportion } = await form.validateFields();
            setResult(price / proportion);
          } catch (error) {}
        }}
      >
        计算
      </Button>
    </Flex>
  );
};

export default App;
