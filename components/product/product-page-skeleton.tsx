import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { AppContainer, AppSkeleton } from "@/components/shared/ui";

export function ProductPageSkeleton() {
  return (
    <Box>
      <Box sx={{ py: 7, display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
        <AppSkeleton width={280} height={42} />
        <AppSkeleton width={220} height={18} />
      </Box>
      <AppContainer sx={{ pb: 6 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
          }}
        >
          <Box>
            <AppSkeleton variant="rectangular" sx={{ width: "100%", aspectRatio: "1 / 1.15" }} />
            <Stack direction="row" spacing={1.5} sx={{ mt: 1.5 }}>
              {Array.from({ length: 4 }).map((_, index) => (
                <AppSkeleton key={index} variant="rectangular" width="25%" height={88} />
              ))}
            </Stack>
          </Box>
          <Stack spacing={1.5}>
            <AppSkeleton width="70%" height={18} />
            <AppSkeleton width="85%" height={36} />
            <AppSkeleton width={160} height={22} />
            <AppSkeleton width={140} height={28} />
            <AppSkeleton width="90%" height={80} />
            <AppSkeleton width="100%" height={120} />
            <Stack direction="row" spacing={1.5}>
              <AppSkeleton width={120} height={48} />
              <AppSkeleton width={160} height={48} />
              <AppSkeleton width={140} height={48} />
            </Stack>
          </Stack>
        </Box>
      </AppContainer>
      <Box sx={{ bgcolor: "#fafafa", py: 6 }}>
        <AppContainer>
          <AppSkeleton width={280} height={36} sx={{ mb: 2 }} />
          <AppSkeleton width="100%" height={120} />
        </AppContainer>
      </Box>
    </Box>
  );
}
