//* MUI
import { Card, CardContent, CardHeader, Grid, Skeleton, Stack } from "@mui/material";

export const BudgetManagementPageSkeleton: React.FC = () => {
  const numberOfCards = Array(3).fill("");

  return (
    <Stack gap={2} marginBottom={5}>
      <Skeleton variant="rounded" width={300} height={"2.369rem"} />
      <Grid container spacing={2}>
        {numberOfCards.map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <BudgetCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

const BudgetCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader
        avatar={<Skeleton variant="rounded" width={40} height={40} />}
        title={<Skeleton variant="text" width={80} sx={{ fontSize: "1rem" }} />}
        subheader={<Skeleton variant="text" width={140} sx={{ fontSize: "1rem" }} />}
      />
      <CardContent style={{ paddingBlock: 0, marginBottom: "24px" }}>
        <Skeleton variant="text" width={"35%"} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width={"25%"} sx={{ fontSize: "1rem" }} />
      </CardContent>
    </Card>
  );
};

export default BudgetCardSkeleton;
