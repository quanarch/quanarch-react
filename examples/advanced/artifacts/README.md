# artifacts

The artifact store: a stand-in for S3 or any object storage. `npm run build`
at the project root writes the builds of billing, inventory and analytics to
`quans/<name>/<version>/<name>.js`, and `server.mjs` serves them on port 4100.

The quanar fetches billing and inventory from here after the server has told it
about them, and checks each file against the hash in the server's quans table.
It loads analytics from here directly, without asking the server.
