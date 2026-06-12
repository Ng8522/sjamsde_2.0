-- Completed FPX / DuitNow payments from EPayment database.
-- Edit column names if your TrnMaster schema differs.
SELECT
  COALESCE(NULLIF(t.FPXTrnId, ''), t.TrnMstId) AS transaction_ref,
  COALESCE(
    NULLIF(t.PayerName, ''),
    NULLIF(t.BuyerName, ''),
    NULLIF(t.CustomerName, ''),
    'Anonymous'
  ) AS donor_name,
  CAST(COALESCE(t.Amount, t.TrnAmount, 0) AS DECIMAL(18, 2)) AS amount,
  COALESCE(t.UpdatedAt, t.CreatedAt, GETDATE()) AS paid_at
FROM dbo.TrnMaster t
WHERE t.Status = 'C'
  AND COALESCE(t.UpdatedAt, t.CreatedAt) > @since
ORDER BY COALESCE(t.UpdatedAt, t.CreatedAt) ASC
