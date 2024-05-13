import { humanReadableTimestamp } from "./timestamp";
import { describe, it, expect } from "vitest"

describe('humanReadableTimestamp', () => {
    it('renders a timestamp to a human readable string that defaults en-UK', () => {
        expect(humanReadableTimestamp(1715173100571, undefined)).to.equal('08/05/2024, 14:58:20');
    });
    it('renders a timestamp to a human readable string that defaults en-UK', () => {
        expect(humanReadableTimestamp(1715173100571, 'de-DE')).to.equal('8.5.2024, 14:58:20');
    });
});