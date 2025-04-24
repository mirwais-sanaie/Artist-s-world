import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://brvdvfhkjjopjlznjxkv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJydmR2ZmhrampvcGpsem5qeGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMzA5OTksImV4cCI6MjA2MDkwNjk5OX0.j_01MX7CsepzlIxu5UG2Dbuy8jwX9O5boup6IjJqWbY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
