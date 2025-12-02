import React, { useState, useCallback } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import { MenuOpen as MenuOpenIcon, DescriptionOutlined, AccountBalanceWalletOutlined, AccountBalanceOutlined, PeopleAltOutlined, ErrorOutlineOutlined, LocationOnOutlined, EventOutlined } from "@mui/icons-material";
import MenuIcon from "../assets/icons/menuIcon.svg?react"

// --- Data Structures ---
interface MenuItem {
  id: string;
  text: string;
  IconComponent: React.ElementType;
  isActive: boolean;
  sectionId: string; // Add sectionId to link to DOM elements
}

const SIDEBAR_ITEMS: MenuItem[] = [
  { id: "_193_4440__Menu_Item", text: "Performance Overview", IconComponent: DescriptionOutlined, isActive: true, sectionId: "performance-section" },
  { id: "_193_4442__Menu_Item", text: "Loans Overview", IconComponent: AccountBalanceWalletOutlined, isActive: false, sectionId: "loans-section" },
  { id: "_193_4444__Menu_Item", text: "Deposit Overview", IconComponent: AccountBalanceOutlined, isActive: false, sectionId: "deposit-section" },
  { id: "_193_4446__Menu_Item", text: "Cash & Investments", IconComponent: AccountBalanceOutlined, isActive: false, sectionId: "cash-investments-section" },
  { id: "_193_4448__Menu_Item", text: "Borrowings", IconComponent: AccountBalanceWalletOutlined, isActive: false, sectionId: "borrowings-section" },
  { id: "_193_4450__Menu_Item", text: "Members", IconComponent: PeopleAltOutlined, isActive: false, sectionId: "members-section" },
  { id: "_193_4452__Menu_Item", text: "Defaulters", IconComponent: ErrorOutlineOutlined, isActive: false, sectionId: "defaulters-section" },
  { id: "_193_4454__Menu_Item", text: "Branch Details", IconComponent: LocationOnOutlined, isActive: false, sectionId: "branch-details-section" },
  { id: "_193_4456__Menu_Item", text: "Upcoming Events", IconComponent: EventOutlined, isActive: false, sectionId: "upcoming-events-section" },
];

interface SidebarProps {
  initialState?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ initialState = false }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(initialState);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(SIDEBAR_ITEMS);

  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // Function to handle menu item click
  const handleMenuItemClick = useCallback((clickedItemId: string, sectionId: string) => {
    // Update active state
    setMenuItems(prevItems => 
      prevItems.map(item => ({
        ...item,
        isActive: item.id === clickedItemId
      }))
    );

    // Scroll to the corresponding section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      console.warn(`Element with id ${sectionId} not found`);
    }

    // Close sidebar after clicking (optional)
    setIsExpanded(false);
  }, []);

  // --- Menu Item Rendering with click handler ---
  const renderMenuItems = menuItems.map((item) => (
    <ListItem
      key={item.id}
      disablePadding
      sx={{
        position: "relative",
        borderRadius: "4px",
        height: "40px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "nowrap",
        p: "8px 12px",
        mt: "4px",
        boxSizing: 'border-box',
        cursor: "pointer",
        ...(item.isActive && {
          backgroundColor: "rgba(0, 137, 107, 1.00)",
        }),
        '&:hover': {
          backgroundColor: item.isActive 
            ? "rgba(0, 137, 107, 0.90)" 
            : "rgba(0, 137, 107, 0.10)",
        },
        transition: "background-color 0.2s ease",
      }}
      onClick={() => handleMenuItemClick(item.id, item.sectionId)}
    >
      <ListItemText
        disableTypography
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          textAlign: "left",
          alignItems: "center",
          height: "21.00px",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            whiteSpace: "nowrap",
            fontFamily: "DM Sans",
            fontStyle: "normal",
            fontSize: "16.0px",
            fontWeight: item.isActive ? "600" : "400",
            color: item.isActive ? "white" : "rgba(104, 104, 104, 1.00)",
          }}
        >
          {item.text}
        </Typography>
      </ListItemText>
    </ListItem>
  ));

  // --- Constants for Positioning ---
  const BUTTON_SIZE = 66;
  const BUTTON_MARGIN = 16;
  const SIDEBAR_HEIGHT = 470;
  const SIDEBAR_WIDTH = 224;

  return (
    <>
      {/* 1. Floating Button - POSITIONED FIXED BUT INDEPENDENT WHEN COLLAPSED */}
      {!isExpanded ? (
        <Button
          id="_193_4498__Floating_Button"
          onClick={toggleSidebar}
          sx={{
            position: "fixed",
            bottom: BUTTON_MARGIN,
            right: BUTTON_MARGIN,
            zIndex: 1002,
            overflow: "hidden",
            background: "rgba(6, 168, 132, 1.00)",
            borderRadius: "100px",
            boxShadow: "0.0px 12.0px 35.0px 0.0px rgba(0, 200, 156, 0.80)",
            height: `${BUTTON_SIZE}px`,
            width: `${BUTTON_SIZE}px`,
            minWidth: `${BUTTON_SIZE}px`,
            padding: 0,
            cursor: "pointer",
            '&:hover': {
              background: 'rgba(6, 168, 132, 0.90)',
              boxShadow: "0.0px 15.0px 40.0px 0.0px rgba(0, 200, 156, 0.90)",
            }
          }}
        >
          {/* <MenuOpenIcon
            sx={{
              height: "26.00px",
              width: "26.00px",
              color: "white",
              transform: "rotate(-90.00deg) scale(-1.0, -1.0)",
              transition: "transform 0.3s ease-in-out",
            }}
          /> */}
          <MenuIcon/>
        </Button>
      ) : null}

      {/* 2. Sidebar Menu - VISIBLE WHEN EXPANDED WITH BUTTON INSIDE */}
      {isExpanded && (
        <Box
          id="_193_4438__Sidebar"
          sx={{
            position: "fixed",
            bottom: BUTTON_MARGIN,
            right: BUTTON_MARGIN,
            zIndex: 1001,
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#ecececff",
            borderStyle: "solid",
            borderWidth: "1px",
            borderTopLeftRadius: "12.0px",
            borderTopRightRadius: "12.0px",
            borderBottomLeftRadius: "12.0px",
            borderBottomRightRadius: "33.0px",
            height: `${SIDEBAR_HEIGHT}px`,
            width: `${SIDEBAR_WIDTH}px`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {/* Menu container #_193_4439__Menu */}
          <List
            component="nav"
            sx={{
              position: "relative",
              height: "calc(100% - 70px)",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              padding: "12px",
              boxSizing: 'border-box',
              overflowY: "auto",
            }}
          >
            {renderMenuItems}
          </List>

          {/* Toggle Button INSIDE the sidebar */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              zIndex: 1003,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: "100%",
              height: "70px",
              boxSizing: "border-box",
            }}
          >
            <Button
              id="_193_4498__Floating_Button"
              onClick={toggleSidebar}
              sx={{
                overflow: "hidden",
                background: "rgba(6, 168, 132, 1.00)",
                borderRadius: "100px",
                height: `${BUTTON_SIZE}px`,
                width: `${BUTTON_SIZE}px`,
                minWidth: `${BUTTON_SIZE}px`,
                boxShadow: "0.0px 12.0px 35.0px 0.0px rgba(0, 200, 156, 0.80)",
                padding: 0,
                cursor: "pointer",
                '&:hover': {
                  background: 'rgba(6, 168, 132, 0.90)',
                  boxShadow: "0.0px 15.0px 40.0px 0.0px rgba(0, 200, 156, 0.90)",
                }
              }}
            >
              {/* <MenuOpenIcon
                sx={{
                  height: "26.00px",
                  width: "26.00px",
                  color: "white",
                  transform: "rotate(0deg)",
                  transition: "transform 0.3s ease-in-out",
                }}
              /> */}
              <MenuIcon/>
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Sidebar;