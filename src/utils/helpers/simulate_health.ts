const rng = () => Math.random();

interface DetectorHealth {
  c1: HafxHealth;
  m1: HafxHealth;
  m5: HafxHealth;
  x1: HafxHealth;
  x123: X123Health;
  timestamp: number;
}

interface X123Health {
  board_temp: number;
  det_high_voltage: number;
  det_temp: number;
  fast_counts: number;
  slow_counts: number;
  accumulation_time: number;
  real_time: number;
}

interface HafxHealth {
  arm_temp: number;
  sipm_temp: number;
  sipm_operating_voltage: number;
  counts: number;
  dead_time: number;
  real_time: number;
}

export const simulate_health = (timestamp: number): DetectorHealth => {
  return {
    c1: simulate_hafx_health(),
    m1: simulate_hafx_health(),
    m5: simulate_hafx_health(),
    x1: simulate_hafx_health(),
    x123: simulate_x123_health(),
    timestamp: timestamp,
  };
};

const simulate_x123_health = (): X123Health => {
  const fc = Math.floor(rng() * (1e6 - 1e4) + 1e4);
  const at = Math.floor(rng() * 2e6);

  return {
    board_temp: Math.floor(rng() * 100 - 50),
    det_high_voltage: Math.floor(rng() * 600 - 800),
    det_temp: Math.floor(rng() * 1000 + 1500),
    fast_counts: fc,
    slow_counts: Math.floor(rng() * (fc - 0.2 * fc) + 0.2 * fc),
    accumulation_time: at,
    real_time: Math.floor(rng() * at * 2 + at),
  };
};

const simulate_hafx_health = (): HafxHealth => {
  const dt = Math.floor(rng() * (1e9 - 1000) + 1000);

  return {
    arm_temp: Math.floor(rng() * (31000 - 26000) + 26000),
    sipm_temp: Math.floor(rng() * (33000 - 24000) + 24000),
    sipm_operating_voltage: Math.floor(rng() * (3900 - 2800) + 2800),
    counts: Math.floor(rng() * (1e5 - 10) + 10),
    dead_time: dt,
    real_time: Math.floor(rng() * dt * 1000 + dt),
  };
};
