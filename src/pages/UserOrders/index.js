import React, { useCallback, useEffect, useState } from "react";
import { Button, LayoutOne, Table, Text } from "upkit";
import { getOrders } from "../../api/order";
import { formatRupiah } from "../../utils/format-rupiah";
import { sumPrice } from "../../utils/sum-price";
import { Link } from "react-router-dom";
import TopBar from '../../components/TopBar';
import StatusLabel from "../../components/StatusLabel";
import FaFileInvoiceDollar from "@meronex/icons/fa/FaFileInvoiceDollar";

const colums = [
  {
    Header: "",
    id: "Status",
    accessor: (order) => {
      return (
        <div>
          #{order.order_number} <br />
          <StatusLabel status={order.status} />
        </div>
      );
    },
  },
  {
    Header: "Items",
    accessor: (order) => {
      return (
        <div>
          {order.order_items.map((item) => {
            return (
              <div key={item._id}>
                {item.name} {item.qty}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    Header: "Total",
    accessor: (order) => {
      return (
        <div>
          {formatRupiah(sumPrice(order.order_items) + order.delivery_fee)}
        </div>
      );
    },
  },
  {
    Header: "Invoice",
    accessor: (order) => {
      return (
        <div>
          <Link to={`/invoice/${order.id}`}>
            <Button color="gray" iconBefore={<FaFileInvoiceDollar />}>
              Invoice
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export default function UserOrders() {
  let [pesanan, setPesanan] = useState([]);
  let [count, setCount] = useState(0);
  let [status, setStatus] = useState("idle");
  let [page, setPage] = useState(1);
  let [limit] = useState(10);

  const fetchPesanan = useCallback(async () => {
    setStatus("process");

    let { data } = await getOrders({ limit, page });

    if (data.error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setPesanan(data.data);
    setCount(data.count);
  }, [page, limit]);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3">Pesanan Anda</Text>
      <br />
      <Table
        items={pesanan}
        totalItems={count}
        columns={colums}
        onPageChange={(page) => setPage(page)}
        page={page}
        isLoading={status === "process"}
      />
    </LayoutOne>
  );
}
