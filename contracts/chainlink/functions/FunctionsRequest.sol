// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Functions {
    enum Location {
        Inline,
        Remote
    }

    enum CodeLanguage {
        JavaScript,
        WebAssembly
    }

    struct Request {
        bytes data;
    }

    function initializeRequest(
        Request memory req,
        Location location,
        CodeLanguage language,
        string memory source
    ) internal pure {
        // Placeholder for actual initialization logic
        req.data = abi.encode(location, language, source);
    }
}
