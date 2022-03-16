import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./DashboardCards.css";

/* Here we see where the 3 cards at the bottom of the dashboard are implemented.
        The section here is called important links. */
function DashboardCards() {
    return (
        <Grid className="DASHBOARD__cards__grid" align="center">
        <Typography sx={{color: "var(--text-primary)"}} className="DASHBOARD__cards__title" gutterBottom variant="h5">
            Important Links
            </Typography>
        <Card data-testid ="card1" variant="contained" className="DASHBOARD__card">
          <CardMedia
            component="img"
            height="220"
            image="https://api.time.com/wp-content/uploads/2020/08/coronavirus-testing.jpg"
            alt="covid testing"
          />
          <CardContent>
            <p className="DASHBOARD__card__label">Info</p>
            <Typography
              className="DASHBOARD__card__title"
              gutterBottom
              variant="h5"
              component="div"
            >
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.ciussswestcentral.ca/health-alerts/coronavirus-covid-19/covid-19-testing-clinics/"
              >
                Covid-19 Testing Policies
              </a>
            </Typography>
            <Typography
              className="DASHBOARD__card__desc"
              variant="body2"
              color="text.secondary"
            >
              Find out how you could get tested if you develop any symptoms
              to the virus.
            </Typography>
          </CardContent>
        </Card>

        <Card data-testid="card2" variant="contained" className="DASHBOARD__card" sx={{marginLeft: 2, marginRight: 2}}>
          <CardMedia
            component="img"
            height="220"
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Quebec.svg/1200px-Flag_of_Quebec.svg.png"
            alt="covid testing"
          />
          <CardContent>
            <p className="DASHBOARD__card__label">Info</p>
            <Typography
              className="DASHBOARD__card__title"
              gutterBottom
              variant="h5"
              component="div"
            >
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.quebec.ca/en/health/health-issues/a-z/2019-coronavirus/situation-coronavirus-in-quebec"
              >
                Data of COVID-19 in Quebec
              </a>
            </Typography>
            <Typography
              className="DASHBOARD__card__desc"
              variant="body2"
              color="text.secondary"
            >
              Most people who fall sick with COVID-19 will experience mild
              to moderate symptoms and recover without special treatment.
              However, some will become seriously ill and require medical
              attention.
            </Typography>
          </CardContent>
        </Card>

        <Card data-testid ="card3" variant="contained" className="DASHBOARD__card">
          <CardMedia
            component="img"
            height="220"
            image="https://cdn.ciusssnordmtl.ca/documents/Nouvelles/2021/MUSC_VaccinationCovid19_Nouvelle_site_webF.png?1614089135"
            alt="covid testing"
          />
          <CardContent>
            <p className="DASHBOARD__card__label">Info</p>
            <Typography
              className="DASHBOARD__card__title"
              gutterBottom
              variant="h5"
              component="div"
            >
              <a
                target="_blank"
                rel="noreferrer"
                href="https://portal3.clicsante.ca/"
              >
                Appointment for vaccination
              </a>
            </Typography>
            <Typography
              className="DASHBOARD__card__desc"
              variant="body2"
              color="text.secondary"
            >
              To book a appointment for the vaccination, as well as check
              eligibilty, click on this link for more info.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
}

export default DashboardCards;