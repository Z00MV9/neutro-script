import natural from 'natural';
import nlp from 'compromise';

export function checkBiasAndFairness(article: string): { biasScore: number; fairnessScore: number } {
  // Convert the article to lowercase for case-insensitive matching
  const lowercaseArticle = article.toLowerCase();

  // Define bias terms and patterns
  const genderBiasTerms = ['he', 'she', 'him', 'her', 'his', 'hers'];
  const racialBiasTerms = ['race', 'ethnicity', 'racial', 'ethnic']; // Add more terms as needed

  // Count the occurrences of bias terms
  const genderBiasCount = genderBiasTerms.reduce((count, term) => {
    return count + (lowercaseArticle.match(new RegExp(`\\b${term}\\b`, 'g')) || []).length;
  }, 0);

  const racialBiasCount = racialBiasTerms.reduce((count, term) => {
    return count + (lowercaseArticle.match(new RegExp(`\\b${term}\\b`, 'g')) || []).length;
  }, 0);

  // Calculate bias scores
  const genderBiasScore = genderBiasCount / article.split(' ').length;
  const racialBiasScore = racialBiasCount / article.split(' ').length;

  // Calculate overall bias and fairness scores
  const biasScore = (genderBiasScore + racialBiasScore) / 2;
  const fairnessScore = 1 - biasScore;

  return { biasScore, fairnessScore };
}