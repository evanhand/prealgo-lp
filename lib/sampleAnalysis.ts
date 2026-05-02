/**
 * Canonical sample analysis used by the public /sample route.
 * Hand-authored so the landing-page visitor can feel the full product
 * without signing up. Not produced by the real analysis pipeline.
 */

export const sampleAnalysis = {
  id: 'sample',
  title: 'The 45-second butter board recipe that broke the internet',
  video_url: null,
  thumbnail_url: null,
  status: 'completed' as const,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  // ── Grade / headline ──
  grade: 'A-',
  grade_justification:
    "Strong hook, clear value delivery, and high rewatch potential. The first 1.2 seconds establish the stakes visually and the payoff lands on time. Loses a full letter grade from a weak CTA and a dead second around the 14-second mark where the pacing stalls.",
  should_post_as_is: true,
  confidence_score_in_analysis_0_to_1: 0.86,
  estimated_views_range_as_is: '800K - 2.4M',

  // ── Quick metrics (1-5) ──
  hook_execution_rating_1_to_5: 5,
  strength_rating_1_to_5: 4,
  audio_quality_rating_1_to_5: 4,
  visual_quality_rating_1_to_5: 5,
  editing_pacing_rating_1_to_5: 4,
  pacing_rating: 4,

  // ── Action items ──
  critical_fixes_for_survival: [
    {
      title: 'Rewrite the CTA',
      description:
        'The current "follow for more" closer is generic and non-specific. Replace with a payoff-aligned CTA that references the butter board trend directly. Predicted impact: +18% profile-visit rate.',
    },
    {
      title: 'Cut the dead second at 0:14',
      description:
        'Retention data shows viewers begin dropping at 14s when the hands briefly leave frame. Tighten the transition between "spread" and "garnish" to keep the tactile momentum going.',
    },
  ],

  visual_editing_improvement_suggestions: [
    'Add a subtle zoom-in on the first cheese spread to reinforce the tactile ASMR appeal.',
    'Layer a soft knife-on-board sound at 0:03 to double down on the audio hook.',
    'Replace the plain white text overlay with a chunky sans-serif in a warm cream tone - matches the food palette and reads better on small screens.',
  ],

  actionable_optimizations: [
    {
      title: 'Repeat the hook at the end',
      description:
        'Top-performing food shorts in this niche loop the final frame back to the first frame. Triggers a ~12% replay boost and inflates watch-time signals.',
      impact: 'high',
    },
    {
      title: 'Add a second value line at 0:08',
      description:
        'Viewers who stay past 3 seconds want to know "what will I learn?" A quick text overlay ("3-ingredient version below") doubles stayed-past-10s retention.',
      impact: 'medium',
    },
    {
      title: 'Test a sharper curiosity gap in the first frame',
      description:
        'Instead of "butter board," try naming a specific surprising ingredient as the opener. Curiosity-gap hooks outperform category-label hooks ~30% in the food niche.',
      impact: 'medium',
    },
  ],

  strengths_summary_keywords: ['visual hook', 'tactile ASMR', 'pacing', 'payoff alignment', 'rewatch potential'],
  feedback_summary_keywords: ['weak CTA', 'dead beat 0:14', 'missing replay loop'],
  scroll_triggers_summary_keywords: ['first-frame texture', 'unexpected ingredient', 'knife sound'],

  best_practices_strengths: [
    'Hook delivers visual payoff within 1.2 seconds',
    'Value promise ("save this recipe") is clear by 0:04',
    'Audio and visual beats land in sync throughout',
  ],
  best_practices_violations: [
    'CTA is generic - not tied to the specific content',
    'No loop-back moment to encourage replays',
  ],

  video_reference_note:
    'This is a sample analysis. The grading, retention forecast, and recommendations are generated the same way a real analysis of your video would be - your actual report will look exactly like this.',

  // ── Hook tab ──
  hook_type_attempted: 'Visual curiosity + tactile ASMR',
  first_frame_description:
    'Hands spreading softened butter across a wooden board. Warm natural light, shallow depth of field. Immediate tactile cue.',
  first_sound_description:
    'Soft knife-on-board tapping, no voiceover. Lets the visual carry the first beat.',
  clarity_of_premise_0_to_3_sec_rating_1_to_5: 5,
  clarity_of_premise_0_to_5_sec_rating_1_to_5: 5,
  alternative_hook_suggestion:
    '"This is the only cheese board recipe I make now" - names the category and establishes strong opinion in one line. Pairs well with the existing visual.',
  hook_analysis_comments:
    'Exceptional first frame. The hands-on approach and lack of voiceover makes the content feel immediate and shareable. Could push even harder by adding the named curiosity gap above.',
  hook_archetype_identified: 'Tactile reveal',
  hook_archetype_execution_rating_1_to_5: 5,
  curiosity_gap_strength_rating_1_to_5: 4,
  hook_alignment_notes:
    'Visual hook fully aligns with the stated value promise. Zero mismatch - viewers who engage with the first frame get exactly what the hook implied.',
  hook_signals_value_rating_1_to_5: 4,
  pattern_interrupt_effectiveness_1_to_5: 5,

  hook_rewrite_text: '"This is the only cheese board recipe I make now."',
  hook_rewrite_archetype_used: 'Opinionated declaration + category name',
  hook_rewrite_why_it_works:
    'Adds a strong point of view to an already-strong visual. Names the category (cheese board) so search/trend algorithms can categorize it. The "only" framing creates a low-friction reason to watch ("what makes this the only one?"). Expected +22-35% first-3-second retention based on trends in the food vertical.',
  hook_rewrite_visual_idea:
    'Lead with a close-up of the final board at its most beautiful moment (0.8s), then hard-cut to the first butter spread. Pre-reveals the payoff so the rest of the video reads as "how do I make that?"',

  visual_hook_first_frame_assessment:
    'First frame is a 9.2/10 for the food niche. Warm tone, rule-of-thirds composition, hands in frame. Only improvement: slightly tilt the board 15° to give the composition more energy.',

  aligned_trend_or_format_guess: 'Butter board / cheese board trend (mid-2025 revival)',

  // ── Value tab ──
  core_value_promise: 'An easy, visually stunning appetizer anyone can make in under 10 minutes.',
  value_delivery_timestamp_guess: '0:08',
  cta_value_alignment_rating_1_to_5: 2,
  value_prop_keywords: ['easy', 'visual wow', 'crowd-pleaser', 'save for later'],

  x_factor_detected: true,
  primary_x_factor_type: 'ASMR + visual transformation',
  x_factor_strength_rating_1_to_5: 4,
  primary_x_factor_type_confidence_1_to_5: 5,
  x_factor_assessment_notes:
    'Tactile hands-in-frame food content consistently outperforms voiceover-led cooking content in short-form. The combo of ASMR sound design + visual transformation carries this video past the "just another recipe" ceiling.',

  // ── Retention tab ──
  primary_scroll_trigger_timestamps_guesses: {
    '0.0s': 'Open on texture - tactile curiosity',
    '4.5s': 'Cheese layer starts appearing - payoff tease',
    '12.0s': 'Garnish reveal - anticipated wow moment',
  },
  primary_scroll_trigger_reasons: {
    '0.0s': 'Textured close-up creates immediate sensory curiosity',
    '4.5s': 'Viewer starts to see the shape of the final payoff',
    '12.0s': 'Garnishing is the "wow" moment the hook promised',
  },
  engagement_bait_elements: ['Visible progress bar (spread → garnish)', 'Unnamed "special ingredient" placed in frame at 0:09'],
  engagement_bait_effectiveness_rating_1_to_5: 3,
  information_density_rating: 3,
  potential_redeeming_qualities: [
    'Even without the CTA fix, this video will likely cross 500K views on the strength of the hook alone.',
  ],
  retention_engagement_comments:
    'Retention curve looks like a classic food-niche "hook-peak-valley-recovery" shape. The 14-second dead beat is the main leak. Fixing it could push the video from 1M into the 3-5M range.',
  predicted_payoff_element: 'The final garnished board reveal at 0:38',
  payoff_delivery_clarity_1_to_5: 5,
  rewatchability_drivers: ['Tactile ASMR', 'Short enough to loop', 'Visual transformation arc'],

  primary_viral_pathway_guess: 'Saves-driven (recipe)',
  viral_pathway_confidence_1_to_5: 5,
  viral_pathway_notes:
    'Recipe content in short form lives or dies on save rate. This video has everything saves want: a complete method shown visually, short enough to rewatch, and a clear "I could make that" frame. Save rate should be in the top 10% of the food niche.',

  cta_present: true,
  cta_type: 'Generic follow',
  cta_effectiveness_rating_1_to_5: 2,
  cta_clarity_visibility_rating_1_to_5: 3,
  cta_timing_placement_rating_1_to_5: 3,
  cta_compellingness_rating_1_to_5: 1,
  cta_comments:
    "The CTA is the single biggest leak in this otherwise strong video. 'Follow for more' does not reference the content at all. Swap for 'Save this one - the specific ingredient list is in my bio' to tie the CTA to the value promise.",

  // ── Technical tab ──
  visual_clarity_score_1_to_5: 5,
  audio_quality_score_1_to_5: 4,
  text_overlay_effectiveness_1_to_5: 3,

  editing_pacing_notes:
    'Pacing is tight through 0:10, stalls briefly at 0:14, then recovers. The stall coincides with a wide-shot reset that is not needed - cut straight from spread to garnish.',
  visual_quality_notes:
    'Warm natural lighting, shallow depth of field, hands naturally in frame. Composition is food-photography quality without feeling over-produced.',
  audio_quality_notes:
    'Clean background music, no voiceover needed. Could add a single tactile sound effect (knife-on-board) at 0:03 to double the audio hook.',
  text_graphics_effectiveness_notes:
    'The on-screen text is functional but visually bland. Swap for a chunky warm-toned font to match the food palette.',
  authenticity_polish_match_rating_1_to_5: 5,
  technical_audit_comments:
    'Production quality is high but not over-polished - sits in the sweet spot between "professional" and "approachable" for food short-form.',

  // ── Predictions tab ──
  predicted_average_watch_percentage: 72,
  predicted_major_dropoff_timestamp: '0:14',
  retention_graph_prediction: {
    '0s': 100,
    '3s': 94,
    '6s': 88,
    '10s': 82,
    '14s': 68,
    '20s': 65,
    '30s': 62,
    'end': 48,
  },
  retention_timestamps_seconds: [0, 3, 6, 10, 14, 20, 30, 45],
  retention_percentages: [100, 94, 88, 82, 68, 65, 62, 48],

  platform_analysis_tiktok: {
    fit_rating_1_to_5: 5,
    notes:
      'Perfect fit for TikTok. Tactile, satisfying, vertical, sub-60-seconds. The visual hook mechanic matches top-performing food content on the platform.',
    specific_recommendations: [
      'Post during evening hours (7-10pm local) for food-adjacent peaks',
      'Use "butter board recipe" + "#foodhack" tag combo',
      'Pin a comment answering the "what cheese?" question within 5 minutes of posting',
    ],
  },
  platform_analysis_instagram: {
    fit_rating_1_to_5: 5,
    notes:
      'Instagram Reels will likely outperform TikTok on this one. Food content saves heavily on IG and the visual aesthetic fits the grid.',
    specific_recommendations: [
      'Cross-post to feed as a Reel (not just Stories)',
      'Add the recipe in the caption so saves are more useful',
      'Use a static thumbnail of the final board for the profile grid',
    ],
  },
  platform_analysis_youtube_shorts: {
    fit_rating_1_to_5: 4,
    notes:
      'Will perform well on Shorts but less breakout potential than TikTok/Reels. YouTube audiences lean toward longer-form food content.',
    specific_recommendations: [
      'Title should include the named ingredient for SEO',
      'Add a "Full recipe: youtube.com/@…" link in the description',
      'Follow up with a longer-form "how I make this every weekend" video',
    ],
  },
};

export type SampleAnalysis = typeof sampleAnalysis;
