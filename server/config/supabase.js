const { createClient } = require("@supabase/supabase-js");

// Thay thông tin với URL và API KEY của bạn
const supabaseUrl = "https://xwmpmnahzdnzfzhzdqgz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3bXBtbmFoemRuemZ6aHpkcWd6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzMwMDAxMCwiZXhwIjoyMDQ4ODc2MDEwfQ.u7i_THAJIYyWZ2Rjbj5sS7wb98XyNslBNKmQTuSOtHE";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;