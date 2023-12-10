export interface Match {
	key: string;
	year: number;
	event: Event;
	comp_level: CompLevel;
	set_number: number;
	match_number: number;
	offseason: boolean;
	status: string;
	video: string;
	red_1: number;
	red_2: number;
	red_3: number;
	red_dq: string;
	red_surrogate: string;
	red_epa_sum: number;
	red_auto_epa_sum: number;
	red_teleop_epa_sum: number;
	red_endgame_epa_sum: number;
	red_rp_1_epa_sum: number;
	red_rp_2_epa_sum: number;
	blue_1: number;
	blue_2: number;
	blue_3: number;
	blue_dq: string;
	blue_surrogate: string;
	blue_epa_sum: number;
	blue_auto_epa_sum: number;
	blue_teleop_epa_sum: number;
	blue_endgame_epa_sum: number;
	blue_rp_1_epa_sum: number;
	blue_rp_2_epa_sum: number;
	winner: Winner;
	epa_winner: Winner;
	epa_win_prob: number;
	red_rp_1_prob: number;
	red_rp_2_prob: number;
	blue_rp_1_prob: number;
	blue_rp_2_prob: number;
	playoff: boolean;
	time: number;
	predicted_time: number;
	red_score: number;
	blue_score: number;
	red_auto: number;
	red_auto_movement: number;
	red_teleop: number;
	red_endgame: number;
	red_no_fouls: number;
	red_fouls: number;
	red_rp_1: number;
	red_rp_2: number;
	red_tiebreaker: number;
	blue_auto: number;
	blue_auto_movement: number;
	blue_teleop: number;
	blue_endgame: number;
	blue_no_fouls: number;
	blue_fouls: number;
	blue_rp_1: number;
	blue_rp_2: number;
	blue_tiebreaker: number;
}

export enum CompLevel {
	F = 'f',
	Qm = 'qm',
	Sf = 'sf'
}

export enum Winner {
	Blue = 'blue',
	Draw = 'draw',
	Red = 'red'
}