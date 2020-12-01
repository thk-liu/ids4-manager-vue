<template>
    <a-select defaultValue style="width:95%"  @change="handClick" showSearch>
                <a-select-option value>全部</a-select-option>
                <a-select-option value="100">100 - Continue</a-select-option>
                <a-select-option value="101">101 - Switching Protocols</a-select-option>
                <a-select-option value="102">102 - Processing</a-select-option>
                <a-select-option value="103">103 - Early Hints</a-select-option>
                <a-select-option value="200">200 - OK</a-select-option>
                <a-select-option value="201">201 - Created</a-select-option>
                <a-select-option value="202">202 - Accepted</a-select-option>
                <a-select-option value="203">203 - Non-authoritative Information</a-select-option>
                <a-select-option value="204">204 - No Content</a-select-option>
                <a-select-option value="205">205 - Reset Content</a-select-option>
                <a-select-option value="206">206 - Partial Content</a-select-option>
                <a-select-option value="207">207 - Multi-Status</a-select-option>
                <a-select-option value="208">208 - Already Registered</a-select-option>
                <a-select-option value="226">226 - IM Used</a-select-option>
                <a-select-option value="300">300 - Multiple Choices</a-select-option>
                <a-select-option value="301">301 - Moved Permanently</a-select-option>
                <a-select-option value="302">302 - Found</a-select-option>
                <a-select-option value="303">303 - See Other</a-select-option>
                <a-select-option value="304">304 - Not Modified</a-select-option>
                <a-select-option value="305">305 - Use Proxy</a-select-option>
                <a-select-option value="306">306 - Switch Proxy</a-select-option>
                <a-select-option value="307">307 - Temporary Redirect</a-select-option>
                <a-select-option value="308">308 - Permanent Redirect</a-select-option>
                <a-select-option value="400">400 - Bad Request</a-select-option>
                <a-select-option value="401">401 - Unauthorized</a-select-option>
                <a-select-option value=402>402 - Payment Required</a-select-option>
                <a-select-option value=403>403 - Forbidden</a-select-option>
                <a-select-option value=404>404 - Not Found</a-select-option>
                <a-select-option value=405>405 - Method Not Allowed</a-select-option>
                <a-select-option value=406>406 - Not Acceptable</a-select-option>
                <a-select-option value=407>407 - Proxy Authentication Required</a-select-option>
                <a-select-option value=408>408 - Request Timeout</a-select-option>
                <a-select-option value=409>409 - Conflict</a-select-option>
                <a-select-option value=410>410 - Gone</a-select-option>
                <a-select-option value=411>411 - Length Required</a-select-option>
                <a-select-option value=412>412 - Precondition Failed</a-select-option>
                <a-select-option value=413>413 - Payload Too Large</a-select-option>
                <a-select-option value=414>414 - Request-URI Too Long</a-select-option>
                <a-select-option value=415>415 - Unsupported Media Type</a-select-option>
                <a-select-option value=416>416 - Requested Range Not Satisfiable</a-select-option>
                <a-select-option value=417>417 - Expectation Failed</a-select-option>
                <a-select-option value=421>421 - Misdirected Request</a-select-option>
                <a-select-option value=423>423 - Locked</a-select-option>
                <a-select-option value=424>424 - Failed Dependency</a-select-option>
                <a-select-option value=426>426 - Upgrade Required</a-select-option>
                <a-select-option value=428>428 - Precondition Required</a-select-option>
                <a-select-option value=429>429 - Too Many Requests</a-select-option>
                <a-select-option value=431>431 - Request Header Fields Too Large</a-select-option>
                <a-select-option value=451>451 - Unavailable For Legal Reasons</a-select-option>
                <a-select-option value=500>500 - Internal Server Error</a-select-option>
                <a-select-option value=501>501 - Not Implemented</a-select-option>
                <a-select-option value=502>502 - Bad Gateway</a-select-option>
                <a-select-option value=503>503 - Service Unavailable</a-select-option>
                <a-select-option value=504>504 - Gateway Timeout</a-select-option>
                <a-select-option value=505>505 - HTTP Version Not Supported</a-select-option>
                <a-select-option value=506>506 - Variant Also Negotiates</a-select-option>
                <a-select-option value=507>507 - Insufficient Storage</a-select-option>
                <a-select-option value=508>508 - Loop Detected</a-select-option>
                <a-select-option value=510>510 - Not Extended</a-select-option>
                <a-select-option value=511>511 - Network Authentication Required</a-select-option>
              </a-select>
</template>
<script>
export default {
    name:"HttpStatusCode",
    
    methods:{
        handClick(e){
          this.$emit('input',e)
        }
    }
}
</script>