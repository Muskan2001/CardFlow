import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="h6" color="white" gutterBottom>
              CardFlow
            </Typography>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
              A simple and elegant task management tool
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              href=
              "https://github.com/Muskan2001"
              target="_blank"
              sx={{ color: "white" }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com/in/Muskan2001"
              target="_blank"
              sx={{ color: "white" }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="mailto:muskanchourasiya2586@gmail.com"
              sx={{ color: "white" }}
            >
              <EmailIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            © {new Date().getFullYear()} CardFlow. Created by Muskan
          </Typography>
        
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
