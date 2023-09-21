import React, { useEffect, useRef } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { fabric } from "fabric";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Button } from "@mui/material";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawerWidth = 240;
  const canvasInstance = useRef<fabric.Canvas | null>(null);

  const fitToContainer = () => {
    if (!canvasRef.current) return;

    // Make it visually fill the positioned parent
    canvasRef.current.style.width = "100%";
    canvasRef.current.style.height = "100%";
    // ...then set the internal size to match
    canvasRef.current.width = canvasRef.current.offsetWidth;
    canvasRef.current.height = canvasRef.current.offsetHeight;
  };

  useEffect(() => {
    fitToContainer();
    canvasInstance.current = new fabric.Canvas(canvasRef.current, {
      preserveObjectStacking: true,
      isDrawingMode: true,
    });
  }, []);

  return (
    <div className="App">
      <Box sx={{ display: "flex", flex: 1 }} className="primary-container">
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              The Math Gift
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {["Dashboard", "Courses", "My Learning"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {["Account", "Settings", "Support"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Button
            onClick={() => {
              canvasInstance.current?.renderAndReset();
            }}
          >
            Reset
          </Button>
          <canvas ref={canvasRef} id="primary-canvas" className="canvas" />
        </Box>
      </Box>
    </div>
  );
}

export default App;
