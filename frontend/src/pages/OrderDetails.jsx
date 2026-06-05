import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get(`/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <h2>Loading......</h2>;
  }

  const timelineItem = (completed, title, date) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: completed ? "#22c55e" : "#d1d5db",
          flexShrink: 0,
        }}
      />
      <div>
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#666",
            fontSize: "14px",
          }}
        >
          {date ? new Date(date).toLocaleDateString() : "Pending"}
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Order Details
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              marginBottom: "30px",
            }}
          >
            <p
              style={{
                marginBottom: "12px",
              }}
            >
              <strong>Order ID:</strong> {order._id}
            </p>

            <p
              style={{
                marginBottom: "12px",
              }}
            >
              <strong>Total:</strong> ₹{order.totalPrice}
            </p>

            <p
              style={{
                marginBottom: "12px",
              }}
            >
              <strong>Status:</strong>{" "}
              <span
                style={{
                  padding: "5px 12px",
                  borderRadius: "20px",
                  backgroundColor:
                    order.status === "DELIVERED"
                      ? "#dcfce7"
                      : order.status === "CANCELLED"
                      ? "#fee2e2"
                      : "#fff3cd",
                  color:
                    order.status === "DELIVERED"
                      ? "#166534"
                      : order.status === "CANCELLED"
                      ? "#991b1b"
                      : "#856404",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </p>

            <p
              style={{
                marginBottom: "12px",
              }}
            >
              <strong>Payment:</strong>{" "}
              <span
                style={{
                  padding: "5px 12px",
                  borderRadius: "20px",
                  backgroundColor: order.isPaid ? "#dcfce7" : "#fee2e2",
                  color: order.isPaid ? "#166534" : "#991b1b",
                  fontWeight: "bold",
                }}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </p>
          </div>

          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Order Tracking
          </h2>

          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {timelineItem(true, "Order Placed", order.createdAt)}

              {timelineItem(
                order.isPaid,
                "Payment Completed",
                order.paidAt
              )}

              {timelineItem(
                ["SHIPPED", "DELIVERED"].includes(order.status),
                "Shipped",
                order.shippedAt
              )}

              {timelineItem(
                order.status === "DELIVERED",
                "Delivered",
                order.deliveredAt
              )}
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              📍 Shipping Address
            </h2>

            <div>
              <p>
                <strong>Name:</strong> {order.shippingAddress?.fullName}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress?.address}
              </p>
              <p>
                <strong>City:</strong> {order.shippingAddress?.city}
              </p>
              <p>
                <strong>Postal Code:</strong> {order.shippingAddress?.postalCode}
              </p>
              <p>
                <strong>Ordered on:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          📦 Products
        </h2>

        {order.orderItems
          .filter((item) => item.product)
          .map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "15px",
                marginBottom: "15px",
                backgroundColor: "#f9f9f9",
                borderRadius: "12px",
              }}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <div>
                <h3>{item.product.name}</h3>
                <p>Qty: {item.qty}</p>
                <p>₹{item.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default OrderDetails;