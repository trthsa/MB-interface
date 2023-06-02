import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Link, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect } from "react";
import { LocalGetter, LocalSaver } from "./AccLogging/Login";
const pages = [
  // "Vé máy bay",
  "Lịch sử đặt vé",
  "Tra cứu chuyến bay",
  "Đăng ký/ Đăng nhập",
];
enum PageLinks {
  Acc_Logging = "acc_logging",
  Member_Page = "member",
}
const pages_full = [
  // {
  //   name: "Vé máy bay",
  //   link: PageLinks.Member_Page,
  // },
  {
    name: "Lịch sử đặt vé",
    link: PageLinks.Member_Page,
  },
  {
    name: "Tra cứu chuyến bay",
    link: "/",
  },
  {
    name: "Đăng ký/ Đăng nhập",
    link: PageLinks.Acc_Logging,
  },
];
const settings = ["Logout"];

function NavBar() {
  //TODO get user info
  const [user, setUser] = React.useState<any | null>();
  useEffect(() => {
    const timer = setInterval(() => {
      setUser(LocalGetter("user"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    console.log(123);
    //open new url
    // window.open(PageLinks.Acc_Logging);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AirplaneTicketIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HuJet
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HuJet
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages_full.map((page) => {
              switch (page.name) {
                case "Đăng ký/ Đăng nhập": {
                  if (user?.UserName) {
                    return <></>;
                  }
                }
                default:
                  return (
                    <Button
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <a href={page.link}>{page.name}</a>
                    </Button>
                  );
              }
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user?.UserName}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography textAlign="center">
                  Chào <span className="text-mainColor">{user?.UserName}</span>
                </Typography>
              </MenuItem>

              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting === "Logout" ? (
                    user ? (
                      <Typography
                        onClick={() => {
                          LocalSaver("user", "");
                          //trigger re-render
                          window.location.reload();
                        }}
                      >
                        {setting}
                      </Typography>
                    ) : (
                      <Typography>
                        <Link href="/acc_logging">Login</Link>
                      </Typography>
                    )
                  ) : (
                    <Typography textAlign="center">{setting}</Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
