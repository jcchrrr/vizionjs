const container = document.getElementById("network");

const options = {
  groups: {
    useDefaultGroups: false,
  },
  nodes: {
    shape: "dot",
    size: 10,
    font: {
      size: 8,
      color: "#fdfdfd",
    },
    borderWidth: 2,
  },
  edges: {
    width: 0.15,
    color: { inherit: "from" },
    smooth: {
      type: "continuous",
    },
  },
  physics: {
    stabilization: true,
    barnesHut: {
      gravitationalConstant: -10000,
      centralGravity: 0.3,
      springLength: 95,
      springConstant: 0.04,
      damping: 0.09,
      avoidOverlap: 0.1,
    },
  },
  interaction: {
    tooltipDelay: 200,
    hideEdgesOnDrag: true,
  },
};

fetch("/data")
  .then((response) => response.json())
  .then((data) => {
    const network = new vis.Network(container, data, options);
  });
