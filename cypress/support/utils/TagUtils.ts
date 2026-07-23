export class TagUtils {
  /**
   * Extracts tags (words starting with '@') from a test or suite title string.
   * 
   * @param title Test title or suite name
   * @returns Array of lowercase tag strings (e.g. ['@smoke', '@qr'])
   */
  static extractTags(title: string): string[] {
    if (!title) return [];
    const tagMatches = title.match(/@[a-zA-Z0-9_-]+/g);
    return tagMatches ? tagMatches.map((t) => t.toLowerCase()) : [];
  }

  /**
   * Checks whether a test title matches the requested target tag or list of tags.
   * 
   * @param testTitle Full test title string
   * @param targetTags Target tag string or array of tags to filter by
   * @returns boolean True if test matches tag criteria
   */
  static matchesTag(testTitle: string, targetTags?: string | string[]): boolean {
    if (!targetTags) return true;

    const requestedTags = Array.isArray(targetTags)
      ? targetTags.map((t) => (t.startsWith('@') ? t.toLowerCase() : `@${t.toLowerCase()}`))
      : targetTags
          .split(',')
          .map((t) => t.trim().toLowerCase())
          .map((t) => (t.startsWith('@') ? t : `@${t}`));

    if (requestedTags.length === 0) return true;

    const testTags = this.extractTags(testTitle);
    return requestedTags.some((tag) => testTags.includes(tag));
  }

  /**
   * Helper to format a test title with tags appended.
   * 
   * @param baseTitle Test description
   * @param tags Array of tag strings
   * @returns Formatted title string
   */
  static formatTitle(baseTitle: string, tags: string[]): string {
    const formattedTags = tags
      .map((t) => (t.startsWith('@') ? t : `@${t}`))
      .join(' ');
    return `${baseTitle} [${formattedTags}]`;
  }
}
