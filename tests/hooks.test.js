/** A hook must never silently approve ordinary work or truncate a delayed event. */
const { spawn, spawnSync } = require("node:child_process");
const path = require("node:path");
const { evaluate } = require("../scripts/hooks/prevent-destructive-commands");
const script = path.join(__dirname, "../scripts/hooks/prevent-destructive-commands.js");
test.each(["git status","node --version","Get-ChildItem"])("abstains for %s", command => {
  expect(evaluate({tool_name:"run_in_terminal",tool_input:{command}})).toEqual({});
});
test.each(["git reset --hard","git push origin main --force","Remove-Item -Force -Recurse C:\\demo","rm -rf /demo"])("vetoes the example pattern %s", command => {
  expect(evaluate({tool_input:{command}}).hookSpecificOutput.permissionDecision).toBe("deny");
});
test("a read-only tool receives no approval override", () => expect(evaluate({tool_name:"read_file",tool_input:{path:"README.md"}})).toEqual({}));
test("malformed input is a blocking parse failure", () => {
  const result=spawnSync(process.execPath,[script],{input:"{broken",encoding:"utf8"});
  expect(result.status).toBe(2);
  expect(result.stdout).toBe("");
});
test("waits for delayed stdin EOF instead of using a short timer", done => {
  const child=spawn(process.execPath,[script]);
  let output="";
  child.stdout.on("data",data=>{output+=data;});
  child.on("error",done);
  child.stdin.write('{"tool_input":');
  const timer=setTimeout(()=>child.stdin.end('{"command":"git reset --hard"}}'),150);
  child.on("close",code=>{
    clearTimeout(timer);
    try { expect(code).toBe(0); expect(JSON.parse(output).hookSpecificOutput.permissionDecision).toBe("deny"); done(); }
    catch(error) { done(error); }
  });
});
