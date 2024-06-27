"use client";

import PageContainer from "@/components/container/PageContainer";
import { Box, Typography, Divider } from "@mui/material";

export default function Home() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box
        sx={{
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Box
          component="img"
          sx={{
            height: "100%",
            width: "100%",
            borderRadius: 1,
          }}
          alt="The house from the offer."
          src="https://smallsat.umn.edu/sites/smallsat.umn.edu/files/files/media/impresssat.png"
        />
        <Typography sx={{ m: 4 }} variant="h1" gutterBottom>
          IMPRESS Data Interface
        </Typography>
        <Divider />
        <Typography sx={{ m: 4 }} variant="h2" gutterBottom>
          Mission Statement
        </Typography>
        <Typography sx={{ m: 4 }} variant="body1">
          The <b>IM</b>pulsive <b>P</b>hase <b>R</b>apid <b>E</b>nergetic
          <b> S</b>olar <b>S</b>pectrometer (IMPRESS) is a solar science mission
          that will fly a hard X-ray ({">"}
          10 keV) spectrometer on a 3U CubeSat to investigate particle
          acceleration in solar flares. IMPRESS will perform soft and hard X-ray
          (SXR and HXR, respectively) spectroscopy of solar flares in the rising
          phase of Solar Cycle 25. IMPRESS is optimized to observe high-cadence
          HXR and SXR spectra from a wide range of solar flares (targeting C1 to
          X1 class flares) without saturating the detector and without the need
          for disruptive movable attenuators. These measurements will be used to
          (1) investigate sub-second variations in HXR flux that strongly
          constrain flare acceleration timescales; (2) perform a mission of
          opportunity by co-observing HXRs from solar flares along with the
          Spectrometer/Telescope for Imaging X-rays (STIX) onboard Solar
          Orbiter, systematically studying directivity; and serve as a HXR
          monitor of flares associated with solar eruptive events that will
          drive space weather in the next solar cycle.
        </Typography>
        <Typography sx={{ m: 4 }} variant="body1">
          The IMPRESS detectors are four CeBr scintillator crystals read out by
          silicon photomultipliers and one Amptek X123 silicon drift diode. To
          capture fast time variations, these detectors will produce 4-12 keV
          SXR spectra at a 1 Hz cadence and 8-100 keV HXR spectra at a 32 Hz
          cadence. The payload is carried on a 3U CubeSat platform. IMPRESS has
          a target launch date of late 2021 with a planned minimum mission life
          of at least 6 months.
        </Typography>
        <Typography sx={{ m: 4 }} variant="body1">
          The data acquired by will be used to help understand how solar flares
          accelerate particles to extraordinarily high energies. Fast bursts
          undistinguishable to previous solar-dedicated HXR imagers (e.g.
          RHESSI) will be analyzed to understand their durations and
          distributions, placing key constraints on particle acceleration
          processes. Coordinated observations with STIX will systematically
          studying HXR directivity, providing a quantitative test of the
          thick-target model of solar flares. This topic is of importance to
          NASA in that it deepens our understanding of the Sun, Earth, Solar
          System, and Universe (Strategic Objective 1.1) and also addresses
          national challenges and catalyzes economic growth via developing and
          transferring revolutionary technologies to enable exploration
          capabilities for NASA and the nation (Strategic Objective 3.1).
          IMPRESS's detector system is being developed with the intention of its
          applicability to any system requiring fast high-energy (X-ray and
          gamma ray) spectroscopy with high time precision.
        </Typography>
        <Typography sx={{ m: 4 }} variant="body1">
          <b>Sponsor</b>: National Science Foundation
        </Typography>
        <Typography sx={{ m: 4, pb: 4 }} variant="body1">
          <b>Collaborators</b>: Montana State University; University of
          California, Santa Cruz; Southwest Research Institute
        </Typography>
      </Box>
    </PageContainer>
  );
}
