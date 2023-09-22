import http from 'k6/http';
import {sleep, check} from 'k6';
import {htmlReport} from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import {textSummary} from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
    scenarios: {
        constant_vus: {
            executor: 'constant-vus',
            vus: 30,
            duration: '2m',
        },
    },
    thresholds: {

        http_req_duration: ['p(95)<5000'],
        http_req_failed: ['rate<0.05'],
        http_reqs: ['rate>25'],
    },

};


const baseUrl = "https://xtml2d3kvbdvphbuvcrrzgjg6q.appsync-api.eu-west-1.amazonaws.com/graphql";



const payload = JSON.stringify({
    query: "query PublicTrips($filter: TableTripPublicFilterInput, $nextToken: String) {\n" +
        "  listPublicTrips(filter: $filter, nextToken: $nextToken) {\n" +
        "    nextToken\n" +
        "    items {\n" +
        "      id\n" +
        "      outbound_from\n" +
        "      outbound_from_datetime\n" +
        "      outbound_to\n" +
        "      outbound_to_datetime\n" +
        "      outbound_timezone\n" +
        "      return_from\n" +
        "      return_from_datetime\n" +
        "      return_to\n" +
        "      return_to_datetime\n" +
        "      return_timezone\n" +
        "      passenger_goal\n" +
        "      trip_type\n" +
        "      booking_reference\n" +
        "      trip_status\n" +
        "      is_published\n" +
        "      regular_ticket_price\n" +
        "      earlybird_ticket_price\n" +
        "      total_regular_tickets\n" +
        "      available_regular_tickets\n" +
        "      total_earlybird_tickets\n" +
        "      available_earlybird_tickets\n" +
        "      total_cancelled_tickets\n" +
        "      deadline_ticket_selling\n" +
        "      name\n" +
        "      category\n" +
        "      info_to_travellers\n" +
        "      website_url\n" +
        "      image_url\n" +
        "      trip_organizer\n" +
        "      __typename\n" +
        "    }\n" +
        "    __typename\n" +
        "  }\n" +
        "}\n",

    variable: "{\n" +
        "    \"nextToken\":null,\n" +
        "    \"filter\":{\n" +
        "        \"country\":\"NO\"\n" +
        "        }\n" +
        "}"
});

const params = {
    headers: {
        "X-Api-Key": "da2-y2mpgrrpejd7bmlfinptdgbrti",
        "Content-Type": "application/json",
    },
}

export default function () {
    const res = http.post(baseUrl, payload, params);
    check(res, {'is status 200': (r) => r.status === 200});
    sleep(1);
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
        stdout: textSummary(data, {indent: " ", enableColors: true}),
    };
}