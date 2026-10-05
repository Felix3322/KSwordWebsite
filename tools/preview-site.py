"""Preview the static site and, optionally, render Markdown from a local KSword checkout."""
import argparse
import functools
import http.server
import re
from pathlib import Path
from urllib.parse import unquote, urlsplit

REPO = Path(__file__).resolve().parent.parent
SITE = REPO / "ksword-website"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--source-root", type=Path)
    args = parser.parse_args()
    source = args.source_root.resolve() if args.source_root else None
    script = (SITE / "learn/learn.js").read_text(encoding="utf-8")
    catalog = set(re.findall(r'''(?:\bp:\s*|"p":\s*)['"]([^'"]+)['"]''', script))

    class Handler(http.server.SimpleHTTPRequestHandler):
        def do_GET(self):
            request_path = unquote(urlsplit(self.path).path)
            if source and request_path == "/learn/learn.js":
                preview_script = re.sub(r"  var RAW = .*?;", "  var RAW = '/__source__/';", script, count=1)
                body = preview_script.encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/javascript; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
            if request_path.startswith("/__source__/"):
                relative = request_path.removeprefix("/__source__/")
                target = (source / relative).resolve() if source else None
                if not target or relative not in catalog or not target.is_relative_to(source) or not target.is_file():
                    self.send_error(404)
                    return
                body = target.read_bytes()
                self.send_response(200)
                self.send_header("Content-Type", "text/plain; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
            super().do_GET()

    handler = functools.partial(Handler, directory=str(SITE))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    print(f"Preview: http://127.0.0.1:{args.port}/", flush=True)
    if source:
        print("Markdown comes from the local checkout; production source files are unchanged.", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
