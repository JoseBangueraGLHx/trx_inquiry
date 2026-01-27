// import { Timeline, Typography } from "antd";
// import React from "react";
// import { historyData } from "../../mockData";

// const { Text } = Typography;

// const HistoryViewTab = () => {
//   return (
//     <div style={{ padding: "24px" }}>
//       <Timeline
//         items={historyData.map((item) => ({
//           // Color verde para completados, gris para pendientes
//           color: item.status === "done" ? "#52c41a" : "#d9d9d9",
//           children: (
//             <>
//               <Text strong style={{ display: "block" }}>
//                 {item.date}
//               </Text>
//               <Text type="secondary">{item.description}</Text>
//             </>
//           ),
//         }))}
//       />
//     </div>
//   );
// };

// export default HistoryViewTab;

import { Timeline, Typography } from "antd";
import { historyData } from "../../mockData";

const { Text } = Typography;

// Constantes
const STYLES = {
  container: {
    padding: 24,
  },
  dateText: {
    display: "block",
  },
};

const TIMELINE_COLORS = {
  DONE: "#52c41a",
  PENDING: "#d9d9d9",
};

const STATUS_TYPES = {
  DONE: "done",
};

// Función para obtener el color según el status
const getTimelineColor = (status) => {
  return status === STATUS_TYPES.DONE ? TIMELINE_COLORS.DONE : TIMELINE_COLORS.PENDING;
};

// Componente para un item individual del timeline
const TimelineItem = ({ date, description }) => (
  <>
    <Text strong style={STYLES.dateText}>
      {date}
    </Text>
    <Text type="secondary">{description}</Text>
  </>
);

// Función para transformar los datos en items del timeline
const mapHistoryToTimelineItems = (data) => {
  return data.map((item) => ({
    color: getTimelineColor(item.status),
    children: <TimelineItem date={item.date} description={item.description} />,
  }));
};

const HistoryViewTab = () => {
  const timelineItems = mapHistoryToTimelineItems(historyData);

  return (
    <div style={STYLES.container}>
      <Timeline items={timelineItems} />
    </div>
  );
};

export default HistoryViewTab;
